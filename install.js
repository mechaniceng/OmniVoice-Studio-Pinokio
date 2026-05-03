module.exports = {
  run: [
    // Clone the OmniVoice Studio repository
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/debpalash/OmniVoice-Studio app",
      },
    },
    // Install Node.js (bun) dependencies for the frontend
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "bun install",
      },
    },
    // Install Python dependencies via uv sync
    // uv sync reads pyproject.toml and installs torch+CUDA automatically
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "uv sync",
          "uv run python scripts/setup_cudnn.py",
        ],
      },
    },
  ],
}
