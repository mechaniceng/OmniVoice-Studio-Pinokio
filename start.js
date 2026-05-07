module.exports = {
  daemon: true,
  run: [
    // Step 1: Start the FastAPI backend on port 3900
    {
      method: "shell.run",
      params: {
        env: {
          PYTHONUNBUFFERED: "1",
          HF_HUB_ENABLE_HF_TRANSFER: "1",
          TORCH_COMPILE_DISABLE: "1",
          PYTHONPATH: "TTS-Engines/CosyVoice",
          TRANSLATE_BASE_URL: "http://localhost:11434/v1"
        },
        venv: ".venv",
        path: "app",
        message: "python -m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 3900",
        on: [{
          event: "/Application startup complete|Uvicorn running on/i",
          done: true,
        }],
      },
    },
    // Step 2: Start the React/Vite frontend on port 3901
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "bun run --cwd frontend dev",
        on: [{
          event: "/(http:\\/\\/\\S+)/",
          done: true,
        }],
      },
    },
    // Step 3: Surface the frontend URL in the Pinokio UI
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}",
      },
    },
  ],
}
