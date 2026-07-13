
import os
import platform

if platform.system() != 'Windows':
    os.environ['GRPC_ENABLE_FORK_SUPPORT'] = '0'
    os.environ['GRPC_POLL_STRATEGY'] = 'epoll1'

import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import requests
from dotenv import load_dotenv
import traceback
from pathlib import Path


try:
    from gemini_chatbot import chatbot as gemini_chatbot
    from simple_chatbot import simple_chatbot
    CHATBOT_ENABLED = True
except ImportError as e:
    print(f"Warning: Chatbot modules not available: {e}")
    CHATBOT_ENABLED = False


load_dotenv()

app = Flask(__name__)
CORS(app)


MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "crop_health_model")

model = None
class_indices = None
health_categories = {
    "healthy": ["healthy"],
    "diseased": ["diseased"],
    "nutrient_deficient": ["nutrient-deficient"]
}


recommendations = {
    "healthy": {
        "care": "Continue with regular watering and maintenance.",
        "watering": "Water as needed based on soil moisture.",
        "issues": "No issues detected."
    },
    "diseased": {
        "care": "Consider removing affected leaves and applying appropriate fungicide or treatment.",
        "watering": "Avoid overhead watering to prevent spread of disease.",
        "issues": "Disease detected. Monitor closely for spread."
    },
    "nutrient_deficient": {
        "care": "Apply balanced fertilizer appropriate for your crop type.",
        "watering": "Ensure proper watering to help nutrient absorption.",
        "issues": "Nutrient deficiency detected. Check soil pH and nutrient levels."
    }
}

def load_model_if_needed():
    """Load the TensorFlow model and class mappings if not already loaded"""
    global model, class_indices, health_categories
    
    if model is None:
        if not os.path.exists(MODEL_PATH):
            return False, "Model not found. Please train the model first."
        
        try:
            print(f"Loading model from {MODEL_PATH}")
            model = tf.keras.models.load_model(MODEL_PATH)
            
           
            class_indices_path = os.path.join(MODEL_PATH, "class_indices.json")
            if os.path.exists(class_indices_path):
                with open(class_indices_path, "r") as f:
                    class_indices = json.load(f)
            else:
                return False, "Class indices file not found."
            
           
            health_categories_path = os.path.join(MODEL_PATH, "health_categories.json")
            if os.path.exists(health_categories_path):
                with open(health_categories_path, "r") as f:
                    health_categories = json.load(f)
                
            return True, "Model loaded successfully"
        except Exception as e:
            return False, f"Error loading model: {str(e)}"
    
    return True, "Model already loaded"

@app.route('/api/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    

    success, message = load_model_if_needed()
    if not success:
        return jsonify({'error': message}), 500
    
    try:
      
        image_file = request.files['image']
        img = Image.open(image_file).convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
    
        predictions = model.predict(img_array)
        predicted_class_idx = np.argmax(predictions[0])
        
     
        idx_to_class = {v: k for k, v in class_indices.items()}
        predicted_class = idx_to_class[predicted_class_idx]
        confidence = float(predictions[0][predicted_class_idx])
       
        health_category = "unknown"
        for category, classes in health_categories.items():
            if predicted_class in classes:
                health_category = category
                break
        
        recommendation = recommendations.get(health_category, recommendations["healthy"])
        
        return jsonify({
            'status': 'success',
            'class': predicted_class,
            'confidence': confidence,
            'health_category': health_category,
            'recommendations': recommendation
        })
    
    except Exception as e:
        print(f"Error analyzing image: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/weather', methods=['GET'])
def get_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    
    if not lat or not lon:
        return jsonify({'error': 'Latitude and longitude required'}), 400
    
    api_key = os.getenv('OPENWEATHERMAP_API_KEY')
    if not api_key:
        return jsonify({'error': 'Weather API key not configured'}), 500
    
    try:
       
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
        response = requests.get(url)
        current_weather = response.json()
        
        if 'cod' in current_weather and current_weather['cod'] != 200:
            return jsonify({'error': current_weather['message']}), 400
        
     
        forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&units=metric"
        forecast_response = requests.get(forecast_url)
        forecast = forecast_response.json()
        
        if 'cod' in forecast and forecast['cod'] != '200':
            return jsonify({'error': forecast['message']}), 400
        
        
        simplified_forecast = []
        forecast_by_day = {}
        
       
        for item in forecast['list']:
           
            date_only = item['dt_txt'].split(' ')[0]
            
         
            if date_only not in forecast_by_day:
                forecast_by_day[date_only] = {
                    'date': item['dt_txt'],  
                    'temp': item['main']['temp'],
                    'description': item['weather'][0]['description'],
                    'humidity': item['main']['humidity'],
                    'wind_speed': item['wind']['speed']
                }
        
       
        days_added = 0
        for date in sorted(forecast_by_day.keys()):
            if days_added < 5:  
                simplified_forecast.append(forecast_by_day[date])
                days_added += 1
        
        return jsonify({
            'current': {
                'temp': current_weather['main']['temp'],
                'humidity': current_weather['main']['humidity'],
                'description': current_weather['weather'][0]['description'],
                'wind_speed': current_weather['wind']['speed']
            },
            'forecast': simplified_forecast
        })
    
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'chatbot': 'enabled' if CHATBOT_ENABLED else 'disabled',
        'model': 'loaded' if model is not None else 'not loaded'
    })

@app.route('/api/model-info', methods=['GET'])
def model_info():
    success, message = load_model_if_needed()
    if not success:
        return jsonify({'error': message}), 500
    

    return jsonify({
        'status': 'success',
        'num_classes': len(class_indices),
        'classes': list(class_indices.keys()),
        'health_categories': health_categories
    })

@app.route('/api/chatbot', methods=['POST'])
def chat():
    if not CHATBOT_ENABLED:
        return jsonify({
            'response': "I'm sorry, the AI chatbot is currently unavailable. Please try again later.",
            'source': "error"
        }), 503
    
    data = request.json
    if not data or 'message' not in data:
        return jsonify({'error': 'No message provided'}), 400
    
    user_message = data['message']
    print(f"Received chatbot message: {user_message}")
    
    try:
      
        response = gemini_chatbot.get_response(user_message)
        
    
        if response['source'] == 'error':
            print("Gemini API error, falling back to simple chatbot")
            response = simple_chatbot.get_response(user_message)
        
        print(f"Sending response: {response['response'][:50]}... (source: {response['source']})")
        
        return jsonify({
            'response': response['response'],
            'source': response['source']
        })
    except Exception as e:
        print(f"Error processing chatbot request: {e}")
        traceback.print_exc()
        
      
        try:
            response = simple_chatbot.get_response(user_message)
            return jsonify({
                'response': response['response'],
                'source': 'fallback'
            })
        except:
            return jsonify({
                'response': "I'm sorry, I'm having trouble processing your request right now.",
                'source': "error"
            }), 500

if __name__ == '__main__':
   
    Path(MODEL_PATH).mkdir(parents=True, exist_ok=True)
    
  
    model_available = os.path.exists(MODEL_PATH) and any(os.listdir(MODEL_PATH))
    if not model_available:
        print("Warning: Model not found. Please train the model before using the analyze endpoint.")
    
 
    if CHATBOT_ENABLED:
        print("Chatbot functionality is enabled.")
    else:
        print("Warning: Chatbot functionality is disabled due to missing modules.")
    
    print("Starting Flask server...")
    app.run(debug=True)