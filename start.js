module.exports = {
  requires: {
    bundle: "ai"
  },
  daemon: true,
  run: [
    // Step 1: Start the FastAPI backend on port 3910
    {
      method: "shell.run",
      params: {
        env: {
          PYTHONUNBUFFERED: "1",
          HF_HUB_ENABLE_HF_TRANSFER: "1",
          TORCH_COMPILE_DISABLE: "1",
          PYTHONPATH: "TTS-Engines/CosyVoice",
          TRANSLATE_BASE_URL: "http://localhost:11434/v1",
          OMNIVOICE_GPTSOVITS_URL: "http://127.0.0.1:9880",
          OMNIVOICE_COSYVOICE_MODEL: "TTS-Engines/CosyVoice/pretrained_models/Fun-CosyVoice3-0.5B",
          OMNIVOICE_DATA_DIR: "app/backend/omnivoice_data"
        },
        path: "app",
        message: "G:/pinokio/envs/omnivoice/python.exe -m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 3910",
        on: [{
          event: "/Application startup complete|Uvicorn running on/i",
          done: true,
        }],
      },
    },
    // Step: Start the GPT-SoVITS TTS service
    {
      method: "shell.run",
      params: {
        path: "app/TTS-Engines/GPT-SoVITS",
        message: "G:/pinokio/envs/omnivoice/python.exe api_v2.py -a 127.0.0.1 -p 9880 -c GPT_SoVITS/configs/tts_infer.yaml",
        on: [{
          event: "/Uvicorn running on|Application startup complete/i",
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
