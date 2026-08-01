from parser import parse_aspiration
import json

user_input = """
I want to become an AI Engineer.
I know Python and basic C++.
I can study 2 hours every day.
I prefer watching YouTube videos.
"""

result = parse_aspiration(user_input)

print(json.dumps(result, indent=4))