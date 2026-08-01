from utils import run_prompt


def ask_coach(
    profile,
    recommendations,
    roadmap,
    journal,
    user_question
):
    context = {
        "profile": profile,
        "recommendations": recommendations,
        "roadmap": roadmap,
        "journal": journal,
        "user_question": user_question,
        "role":"Ai Growth Coach"
    }

    return run_prompt(
        prompt_file="prompts/coach.txt",
        data=context,
        data_label="Context"
    )