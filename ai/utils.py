import json
import re
from pathlib import Path
from gemini import ask_gemini

AI_DIR = Path(__file__).parent.resolve()

def run_prompt(prompt_file, data, data_label="User Input"):
    """
    Reads a prompt template, appends user data,
    sends it to Gemini, and returns parsed JSON.
    """
    target_path = AI_DIR / prompt_file if not Path(prompt_file).is_absolute() else Path(prompt_file)

    with open(target_path, "r", encoding="utf-8") as file:
        system_prompt = file.read()

    final_prompt = f"""
{system_prompt}

{data_label}:
{json.dumps(data, indent=4)}
"""

    response = ask_gemini(final_prompt)

    # Clean markdown codeblocks if Gemini wraps JSON in ```json ... ```
    cleaned_response = response.strip()
    if cleaned_response.startswith("```"):
        cleaned_response = re.sub(r"^```(?:json)?\n|\n```$", "", cleaned_response, flags=re.MULTILINE).strip()

    try:
        return json.loads(cleaned_response)
    except json.JSONDecodeError:
        return {
            "error": "Invalid JSON returned by Gemini",
            "raw_response": response
        }