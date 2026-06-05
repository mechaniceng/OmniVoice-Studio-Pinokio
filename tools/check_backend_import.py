import os
import sys
import traceback

# Ensure repo root is on sys.path so `import backend` works
repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, repo_root)
# Also add the `app` folder (where `backend` lives) to sys.path to match
# how start.js runs uvicorn from the `app` directory.
app_path = os.path.join(repo_root, "app")
sys.path.insert(0, app_path)
app_backend_path = os.path.join(app_path, "backend")
sys.path.insert(0, app_backend_path)

try:
    # start.js runs uvicorn from the `app` directory and uses --app-dir backend
    # so we add app/backend to sys.path and import `main` from there.
    import main as m
    print("Imported app/backend/main.py OK")
except Exception:
    traceback.print_exc()
    sys.exit(1)
