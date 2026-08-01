from utils import run_prompt


def generate_growth_plan(user_input):
    return run_prompt(
        prompt_file="prompts/orchestrator.txt",
        data=user_input,
        data_label="User Input"
    )