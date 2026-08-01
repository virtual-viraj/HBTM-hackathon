import os
import firebase_admin
from firebase_admin import credentials, firestore

db = None
in_memory_db = {}

# Try initializing Firebase Admin
service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY", "service-account-key.json")
if not os.path.isabs(service_account_path):
    backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    service_account_path = os.path.join(backend_dir, service_account_path)

try:
    if not firebase_admin._apps:
        if os.path.exists(service_account_path):
            cred = credentials.Certificate(service_account_path)
            firebase_admin.initialize_app(cred)
            db = firestore.client()
            print("[Firestore] Successfully initialized Firebase Admin SDK.")
        else:
            print(f"[Firestore] Key file not found at '{service_account_path}'. Operating with in-memory fallback.")
    else:
        db = firestore.client()
except Exception as e:
    print(f"[Firestore] Initialization notice: {e}. Using in-memory fallback store.")

def save_document(collection_name: str, doc_id: str, data: dict):
    if db:
        try:
            db.collection(collection_name).document(doc_id).set(data, merge=True)
            return
        except Exception as err:
            print(f"[Firestore error] {err}. Saving to in-memory store.")
    
    if collection_name not in in_memory_db:
        in_memory_db[collection_name] = {}
    if doc_id not in in_memory_db[collection_name]:
        in_memory_db[collection_name][doc_id] = {}
    in_memory_db[collection_name][doc_id].update(data)

def get_document(collection_name: str, doc_id: str):
    if db:
        try:
            doc = db.collection(collection_name).document(doc_id).get()
            if doc.exists:
                return doc.to_dict()
        except Exception as err:
            print(f"[Firestore error] {err}. Checking in-memory store.")
            
    return in_memory_db.get(collection_name, {}).get(doc_id)