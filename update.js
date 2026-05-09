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
    }
  ]
}
