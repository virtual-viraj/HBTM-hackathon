from app.firestore import db
from firebase_admin import firestore  # ← THIS LINE WAS MISSING!

try:
    # Try to write a test document
    test_ref = db.collection("test").document("test_doc")
    test_ref.set({
        "message": "Firebase is working!",
        "timestamp": firestore.SERVER_TIMESTAMP
    })
    print("✅ Firebase connection successful!")
    print("✅ Test document written to Firestore")
except Exception as e:
    print(f"❌ Firebase connection failed: {e}")