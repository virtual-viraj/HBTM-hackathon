from nudge import generate_nudge
import json

user_context = {
    "goal": "AI Engineer",
    "days_inactive": 3,
    "weekly_progress": 60,
    "mood": "Motivated"
}

result = generate_nudge(user_context)

print(json.dumps(result, indent=4))
