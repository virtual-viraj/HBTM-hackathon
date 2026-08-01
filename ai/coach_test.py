from coach import ask_coach
import json

profile = {
    "goal": "AI Engineer",
    "current_skill": "Python, Git",
    "daily_hours": 2,
    "timeline": "6 months"
}

recommendations = {
    "courses": [
        "Machine Learning Specialization by Andrew Ng",
        "Hugging Face NLP Course"
    ],
    "books": [
        "Hands-On Machine Learning with Scikit-Learn"
    ]
}

roadmap = {
    "current_month": "Month 2",
    "current_focus": "Machine Learning and NumPy"
}

journal = {
    "last_summary": "Completed Python basics and started NumPy."
}

question = "Why did you recommend Andrew Ng's course instead of another Udemy course?"

result = ask_coach(
    profile,
    recommendations,
    roadmap,
    journal,
    question
)

print(json.dumps(result, indent=4))