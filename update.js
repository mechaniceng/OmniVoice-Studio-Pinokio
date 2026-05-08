module.exports = {
  run: [
    // Update pinokio scripts 
    {
      method: "shell.run",
      params: {
        message: "git pull",
      },
    },
    // Update Omnivoice
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
