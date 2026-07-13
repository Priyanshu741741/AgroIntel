import os
import json
import requests
import urllib3
from dotenv import load_dotenv
import gc
import atexit
import signal
import sys

load_dotenv()

# Respect SSL_VERIFY env var (set false on corporate networks)
_ssl_verify = os.getenv('SSL_VERIFY', 'true').lower() != 'false'
if not _ssl_verify:
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

GEMINI_REST_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

class GeminiCropChatbot:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY", "")
        self.api_key_error = not bool(self.api_key)
        self.crop_knowledge = self._load_crop_knowledge()

        if self.api_key:
            print(f"Gemini chatbot ready (REST mode, key: {self.api_key[:6]}...)")
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
        """Generate a response using Gemini REST API (avoids gRPC SSL issues)."""
        if self.api_key_error:
            return {
                "response": "AI service unavailable — GOOGLE_API_KEY not configured.",
                "source": "error"
            }

        try:
            prompt = self._create_system_prompt(user_input)
            print(f"Sending to Gemini REST: {user_input[:40]}...")

            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.7, "maxOutputTokens": 800}
            }
            resp = requests.post(
                f"{GEMINI_REST_URL}?key={self.api_key}",
                json=payload,
                verify=_ssl_verify,
                timeout=20
            )
            resp.raise_for_status()
            data = resp.json()
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            return {"response": text, "source": "gemini"}

        except Exception as e:
            print(f"Gemini REST error: {e}")
            err = str(e).lower()
            if "quota" in err or "429" in err:
                msg = "API quota exceeded. Please try again later."
            elif "401" in err or "403" in err or "api_key" in err:
                msg = "Authentication error — please check your GOOGLE_API_KEY."
            else:
                msg = "AI service error. Using fallback."
            return {"response": msg, "source": "error"}
    
    def cleanup(self):
        gc.collect()

    def __del__(self):
        self.cleanup()


chatbot = GeminiCropChatbot()


def signal_handler(sig, frame):
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
if hasattr(signal, 'SIGTERM'):
    signal.signal(signal.SIGTERM, signal_handler)


if __name__ == "__main__":
    print("Testing chatbot...")
    response = chatbot.get_response("How do I care for tomato plants?")
    print(f"Response: {response['response']}")
    print(f"Source: {response['source']}")