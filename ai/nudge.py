from utils import run_prompt


def generate_nudge(user_context):
    return run_prompt(
        prompt_file="prompts/nudge.txt",
        data=user_context,
        data_label="User Context"
    )