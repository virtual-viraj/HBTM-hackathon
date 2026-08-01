from curator import generate_recommendations
import json

user_profile = {
    "goal": "AI Engineer",
    "current_skill": "Python, Basic C++, Git",
    "daily_hours": 2,
    "preferred_learning": "YouTube videos and hands-on projects",
    "timeline": "6 months",
    "age": 19,
    "education": "Second Year IT Student",
    "interests": [
        "Artificial Intelligence",
        "Machine Learning",
        "Hackathons",
        "Open Source"
    ]
}

result = generate_recommendations(user_profile)

print(json.dumps(result, indent=4))