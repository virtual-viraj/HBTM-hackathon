import firebase_admin
from firebase_admin import credentials, firestore
import os

# You need to download this file from Firebase Console
# Save it as "service-account-key.json" in the backend folder
cred = credentials.Certificate("service-account-key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()