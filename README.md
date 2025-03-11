# AgroIntel

## Overview
This is a comprehensive crop monitoring application I developed to help farmers and agricultural professionals monitor crop health, identify diseases, and get personalized recommendations. The application uses machine learning to analyze crop images, provides weather forecasts, and includes an AI-powered chatbot for agricultural advice.

## Features

### Crop Health Analysis
- **Image-based Disease Detection**: Upload images of crops to identify diseases, nutrient deficiencies, or confirm healthy status
- **Personalized Recommendations**: Get specific care instructions based on detected issues
- **Multi-crop Support**: Works with various crop types and common diseases

### Weather Monitoring
- **Real-time Weather Data**: Access current weather conditions for your location
- **5-Day Forecast**: Plan your agricultural activities with a 5-day weather forecast
- **Location-based**: Automatically fetches weather data based on your location

### AI Agricultural Assistant
- **Gemini-powered Chatbot**: Get expert agricultural advice using Google's Gemini AI
- **Crop-specific Knowledge**: Access information about crop care, disease prevention, and best practices
- **Fallback Simple Chatbot**: Ensures advice is always available even without internet connectivity

## Technical Architecture

### Backend
- **Flask API**: RESTful API for handling requests
- **TensorFlow**: Deep learning model for crop disease classification
- **MobileNetV2**: Transfer learning for efficient image classification
- **Google Gemini API**: Advanced AI for the agricultural chatbot

### Frontend
- **React**: Modern, responsive user interface
- **Geolocation API**: For location-based weather data
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm 6+

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/crop-monitoring-app.git
   cd crop-monitoring-app
   ```

2. Set up the application:
   ```
   python backend/run.py --setup
   ```
   This will install all required dependencies for both backend and frontend.

3. Create a `.env` file in the backend directory with your API keys:
   ```
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   GOOGLE_API_KEY=your_google_api_key
   ```

### Training the Model

1. Prepare your dataset:
   ```
   python backend/prepare_dataset.py --dataset_path path/to/plant_village_dataset --output_path models/data
   ```

2. Train the model:
   ```
   python backend/train_model.py --data_path models/data --model_save_path models/crop_health_model --epochs 10 --batch_size 32
   ```

## Running the Application

```
python backend/run.py --mode both
```

This will start both the backend server and frontend development server.

- Backend will be available at: http://localhost:5000
- Frontend will be available at: http://localhost:3000

## Project Structure

```
crop-monitoring-app/
├── backend/
│   ├── api/
│   ├── models/
│   │   ├── crop_health_model/
│   │   └── data/
│   ├── app.py
│   ├── gemini_chatbot.py
│   ├── prepare_dataset.py
│   ├── requirements.txt
│   ├── run.py
│   ├── simple_chatbot.py
│   └── train_model.py
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        └── styles/
```

## Future Improvements

- Mobile application for on-the-go crop monitoring
- Integration with IoT sensors for soil moisture and temperature monitoring
- Expanded crop disease database
- Offline mode for use in areas with limited connectivity
- Community features for sharing knowledge between farmers

## Technologies Used

- **Backend**: Flask, TensorFlow, NumPy, Pillow, Scikit-learn
- **Frontend**: React, HTML5, CSS3, JavaScript
- **APIs**: OpenWeatherMap API, Google Gemini API
- **Data Processing**: Python, TensorFlow Data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed with ❤️ for the agricultural community