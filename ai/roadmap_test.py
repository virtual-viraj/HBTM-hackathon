from roadmap import generate_roadmap
import json

user_profile = {
    "goal": "AI Engineer",
    "current_skill": "Python",
    "daily_hours": 2,
    "preferred_learning": "Videos",
    "timeline": "6 months"
}

result = generate_roadmap(user_profile)

print(json.dumps(result, indent=4))