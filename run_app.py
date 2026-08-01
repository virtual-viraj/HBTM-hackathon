import subprocess
import sys
import os
import time
from pathlib import Path

ROOT_DIR = Path(__file__).parent.resolve()

def run_project():
    print("=" * 60)
    print("  Self-Sculptor (AspireFlow) - Starting Unified Project  ")
    print("=" * 60)

    backend_dir = ROOT_DIR / "backend"
    frontend_dir = ROOT_DIR / "frontend"

    # Set PYTHONPATH
    os.environ["PYTHONPATH"] = f"{ROOT_DIR / 'ai'}{os.pathsep}{backend_dir}"

    print("[1/2] Launching FastAPI Backend on http://localhost:8000 ...")
    backend_cmd = [sys.executable, "-m", "uvicorn", "app.main:app", "--reload", "--port", "8000"]
    backend_process = subprocess.Popen(backend_cmd, cwd=backend_dir)

    print("[2/2] Launching Vite React Frontend on http://localhost:5173 ...")
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_process = subprocess.Popen([npm_cmd, "run", "dev"], cwd=frontend_dir)

    print("\n[SUCCESS] Both servers are running!")
    print("  - Backend API:  http://localhost:8000")
    print("  - OpenAPI Docs: http://localhost:8000/docs")
    print("  - React App:    http://localhost:5173\n")
    print("Press Ctrl+C to terminate both servers.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping servers...")
        backend_process.terminate()
        frontend_process.terminate()

if __name__ == "__main__":
    run_project()
