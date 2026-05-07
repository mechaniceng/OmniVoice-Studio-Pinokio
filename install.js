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
    // Clone the MOSS-TTS-Nano repository into the TTS-Engines directory
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git clone https://github.com/OpenMOSS/MOSS-TTS-Nano TTS-Engines/MOSS-TTS-Nano",
      },
    },
    // Clone the CosyVoice repository into the TTS-Engines directory
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git clone --recursive https://github.com/FunAudioLLM/CosyVoice TTS-Engines/CosyVoice",
      },
    },
    // Update CosyVoice submodule
    {
      method: "shell.run",
      params: {
        path: "app/TTS-Engines/CosyVoice",
        message: "git submodule update --init --recursive",
      },
    },
/*     // Clone the index-tts repository into the TTS-Engines directory
    {
      method: "shell.run",
      params: {
        env: { GIT_LFS_SKIP_SMUDGE: "1" },
        path: "app",
        message: "git clone https://github.com/index-tts/index-tts.git TTS-Engines/index-tts",
      },
    }, */
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
          "uv pip install voxcpm openai sherpa-onnx"
        ]
      },
    },
    {
      method: "shell.run",
      params: {
        path: "app/TTS-Engines/MOSS-TTS-Nano",
        message: [
          "uv pip install -e . --no-deps"
        ]
      },
    },
/*     {
      method: "shell.run",
      params: {
        env: { UV_PYTHON: "3.11" },
        path: "app/TTS-Engines/index-tts",
        message: [
          "uv pip install -e ."
        ]
      },
    }, */
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "uv pip install -r ../requirements_cv.txt --index-strategy unsafe-best-match"
        ]
      },
    },
    {
      when: "{{which('apt')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "apt-get install -y libaio-dev sox libsox-fmt-all"
      },
      next: 'end'
    },
    {
      when: "{{which('yum')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "yum install -y libaio-devel sox"
      },
      next: 'end'
    },
    {
      when: "{{which('winget')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "winget install --id=ChrisBagwell.SoX -e --silent --accept-source-agreements --accept-package-agreements --force --disable-interactivity"
      }
    }
  ]
}
