import json
from gemini import ask_gemini


def run_prompt(prompt_file, data, data_label="User Input"):
    """
    Reads a prompt template, appends user data,
    sends it to Gemini, and returns parsed JSON.
    """

    with open(prompt_file, "r", encoding="utf-8") as file:
        system_prompt = file.read()

    final_prompt = f"""
{system_prompt}

{data_label}:
{json.dumps(data, indent=4)}
"""

    response = ask_gemini(final_prompt)

    try:
        return json.loads(response)
    except json.JSONDecodeError:
        return {
            "error": "Invalid JSON returned by Gemini",
            "raw_response": response
        }