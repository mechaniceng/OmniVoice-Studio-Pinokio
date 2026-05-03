module.exports = {
  run: [
    // Pull the latest changes from GitHub
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull",
      },
    },
    // Re-install Node.js (bun) dependencies
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "bun install",
      },
    },
    // Re-sync Python dependencies
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
