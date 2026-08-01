from app.gemini_client import model

try:
    response = model.generate_content("Say 'Hello, Gemini is working!' in one sentence.")
    print(f"✅ Gemini connection successful!")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"❌ Gemini connection failed: {e}")