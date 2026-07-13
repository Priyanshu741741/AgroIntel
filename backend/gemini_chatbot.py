import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
import gc
import atexit
import signal
import sys


load_dotenv()

class GeminiCropChatbot:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY", "")
        self.model = None
        self.model_name = "models/gemini-1.5-flash"
        self.api_key_error = not bool(self.api_key)
        self.crop_knowledge = self._load_crop_knowledge()

        if self.api_key:
            try:
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel(self.model_name)
                print(f"Gemini chatbot ready with model: {self.model_name}")
            except Exception as e:
                print(f"Gemini init error: {e}")
                self.api_key_error = True
        else:
            print("GOOGLE_API_KEY not set — chatbot will use fallback only.")
    
    def _load_crop_knowledge(self):
        """Load crop-specific knowledge base"""
        knowledge_path = os.path.join(os.path.dirname(__file__), 'crop_knowledge.json')
        
        if os.path.exists(knowledge_path):
            with open(knowledge_path, 'r') as f:
                return json.load(f)
        else:
            print("Warning: crop_knowledge.json not found. Using default knowledge.")
     
            return {
                "crops": {
                    "tomato": {
                        "diseases": ["early blight", "late blight"],
                        "care": "Water regularly, provide full sun."
                    }
                },
                "general_care": {
                    "watering": "Most crops need 1-2 inches of water per week."
                }
            }
    
    def _create_system_prompt(self, user_input):
        """Create a system prompt with agricultural knowledge and user input"""
 
        crops_info = "\n".join([
            f"- {crop}: Diseases: {', '.join(info['diseases'])}. Care: {info['care']}"
            for crop, info in self.crop_knowledge["crops"].items()
        ])
        
        general_care = "\n".join([
            f"- {topic.replace('_', ' ').title()}: {info}"
            for topic, info in self.crop_knowledge["general_care"].items()
        ])
        
    
        return f"""You are an agricultural expert assistant for a Crop Monitoring App. 
Your role is to provide helpful advice about crop care, disease identification, and farming practices.

KEY CROP INFORMATION:
{crops_info}

GENERAL CARE:
{general_care}

When responding to users:
1. Be concise and practical in your advice
2. Suggest relevant tips for crop health based on the user's question
3. If you don't know something specific, acknowledge it and provide general best practices
4. Focus on organic and sustainable farming practices when possible

User Question: {user_input}

Your helpful response:"""
    
    def get_response(self, user_input):
        """Generate a response to the user input using Gemini"""
  
        if self.api_key_error:
            return {
                "response": "I'm sorry, the AI service is currently unavailable. Please check your API key configuration.",
                "source": "error"
            }
        
        try:

            prompt = self._create_system_prompt(user_input)
            
            # Generate content
            print(f"Sending prompt to Gemini: {user_input[:30]}...")
            response = self.model.generate_content(prompt)
            
            return {
                "response": response.text,
                "source": "gemini"
            }
            
        except Exception as e:
            print(f"Error generating Gemini chatbot response: {e}")
            error_message = str(e)
            

            if "quota" in error_message.lower():
                error_msg = "I'm sorry, we've exceeded our quota for AI requests. Please try again later."
            elif "permission" in error_message.lower() or "access" in error_message.lower():
                error_msg = "I'm sorry, there's an authentication issue with our AI service. Please check the API key configuration."
            elif "network" in error_message.lower() or "connection" in error_message.lower():
                error_msg = "I'm sorry, there's a network issue connecting to the AI service. Please check your internet connection."
            else:
                error_msg = "I'm sorry, there was an error processing your request. We'll use our backup system instead."
            
            return {
                "response": error_msg,
                "source": "error"
            }
    
    def cleanup(self):
        """Clean up resources to prevent gRPC shutdown warnings"""
        print("Cleaning up Gemini API resources...")

        gc.collect()
    
    def __del__(self):
   
        self.cleanup()


chatbot = GeminiCropChatbot()


def signal_handler(sig, frame):
    print('Received shutdown signal, cleaning up...')
    chatbot.cleanup()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
if hasattr(signal, 'SIGTERM'):
    signal.signal(signal.SIGTERM, signal_handler)

atexit.register(chatbot.cleanup)


if __name__ == "__main__":
    print("Testing chatbot...")
    response = chatbot.get_response("How do I care for tomato plants?")
    print(f"Response: {response['response']}")
    print(f"Source: {response['source']}")