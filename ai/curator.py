from utils import run_prompt


def generate_recommendations(user_profile):
    return run_prompt(
        prompt_file="prompts/curator.txt",
        data=user_profile,
        data_label="User Profile"
    )