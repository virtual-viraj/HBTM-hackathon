import json

from ai_service import (
    parse_aspiration,
    generate_recommendations,
    generate_roadmap,
    generate_nudge,
    analyze_journal
)

# -----------------------------
# STEP 1: User Aspiration
# -----------------------------

user_input = """
I am a second-year IT student.

I want to become an AI Engineer.

I know Python and Git.

I can study 2 hours every day.

I like learning from YouTube videos and building projects.
"""

print("=" * 60)
print("STEP 1 : USER ASPIRATION")
print("=" * 60)

profile = parse_aspiration(user_input)

print(json.dumps(profile, indent=4))


# -----------------------------
# STEP 2: Recommendations
# -----------------------------

print("\n" + "=" * 60)
print("STEP 2 : RECOMMENDATIONS")
print("=" * 60)

recommendations = generate_recommendations(profile)

print(json.dumps(recommendations, indent=4))


# -----------------------------
# STEP 3: Roadmap
# -----------------------------

print("\n" + "=" * 60)
print("STEP 3 : ROADMAP")
print("=" * 60)

roadmap = generate_roadmap(profile)

print(json.dumps(roadmap, indent=4))


# -----------------------------
# STEP 4: Daily Nudge
# -----------------------------

print("\n" + "=" * 60)
print("STEP 4 : DAILY NUDGE")
print("=" * 60)

context = {
    "goal": profile["goal"],
    "weekly_progress": 60,
    "days_inactive": 2,
    "mood": "Motivated"
}

nudge = generate_nudge(context)

print(json.dumps(nudge, indent=4))


# -----------------------------
# STEP 5: Journal
# -----------------------------

print("\n" + "=" * 60)
print("STEP 5 : JOURNAL ANALYSIS")
print("=" * 60)

journal = analyze_journal("""
Today I completed one ML lesson.

I solved two Python problems.

Tomorrow I want to start NumPy.
""")

print(json.dumps(journal, indent=4))

print("\n" + "=" * 60)
print("AI PIPELINE COMPLETED SUCCESSFULLY")
print("=" * 60)