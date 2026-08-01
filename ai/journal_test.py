from journal import analyze_journal
import json

journal_entry = """
Today I was tired after college.
I couldn't complete my Machine Learning course.
I managed to study Python for one hour.
Tomorrow I want to complete my ML lesson.
"""

result = analyze_journal(journal_entry)

print(json.dumps(result, indent=4))