from utils import run_prompt


def parse_aspiration(user_input):
    return run_prompt(
        prompt_file="prompts/intent.txt",
        data=user_input,
        data_label="User Input"
    )