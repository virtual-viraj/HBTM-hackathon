from utils import run_prompt


def generate_roadmap(user_profile):
    return run_prompt(
        prompt_file="prompts/roadmap.txt",
        data=user_profile,
        data_label="User Profile"
    )