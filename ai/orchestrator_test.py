from orchestrator import generate_growth_plan
import json

user_input = """
I am a second-year IT student.

I want to become an AI Engineer.

I know Python and Git.

I can study 2 hours every day.

I enjoy learning through YouTube videos and hands-on projects.

I want to get an internship within 6 months.
"""

result = generate_growth_plan(user_input)

print(json.dumps(result, indent=4))