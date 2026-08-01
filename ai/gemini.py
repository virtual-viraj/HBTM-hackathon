import os
from dotenv import load_dotenv

load_dotenv()

PREFERRED_MODELS = [
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-pro",
    "gemini-flash-latest"
]

def ask_gemini(prompt, model_name=None):
    api_key = os.getenv("GEMINI_API_KEY") or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        # Fallback to mock response if no API key is provided during offline development
        return "{\n  \"message\": \"Mock AI response (GEMINI_API_KEY not configured)\",\n  \"status\": \"success\"\n}"

    target_model = model_name or os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

    # Try new google.genai SDK first
    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        try:
            response = client.models.generate_content(
                model=target_model,
                contents=prompt
            )
            return response.text
        except Exception:
            for alt in PREFERRED_MODELS:
                try:
                    response = client.models.generate_content(model=alt, contents=prompt)
                    return response.text
                except Exception:
                    continue
    except ImportError:
        pass

    # Fallback to google.generativeai (google-generativeai package)
    try:
        import google.generativeai as legacy_genai
        legacy_genai.configure(api_key=api_key)
        
        # Clean model name for legacy SDK if needed
        clean_model = target_model.replace("models/", "")
        try:
            m = legacy_genai.GenerativeModel(clean_model)
            res = m.generate_content(prompt)
            return res.text
        except Exception:
            for alt in ["gemini-1.5-flash", "gemini-pro", "gemini-1.5-pro"]:
                try:
                    m = legacy_genai.GenerativeModel(alt)
                    res = m.generate_content(prompt)
                    return res.text
                except Exception:
                    continue
    except Exception as legacy_err:
        raise RuntimeError(f"Gemini API execution failed: {legacy_err}")

    return "{\n  \"error\": \"Unable to connect to Gemini API models\"\n}"
