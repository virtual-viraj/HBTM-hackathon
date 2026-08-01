import google.generativeai as genai
from app.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

# Use one of these models (pick the one that works best):
# model = genai.GenerativeModel("models/gemini-2.5-flash")
# Alternative options (uncomment to try):
# model = genai.GenerativeModel("models/gemini-2.0-flash")
# model = genai.GenerativeModel("models/gemini-2.5-pro")
model = genai.GenerativeModel("models/gemini-flash-latest")