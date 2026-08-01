from utils import run_prompt


def analyze_journal(journal_entry):
    return run_prompt(
        prompt_file="prompts/journal.txt",
        data=journal_entry,
        data_label="Journal Entry"
    )