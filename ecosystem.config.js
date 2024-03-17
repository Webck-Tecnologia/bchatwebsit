module.exports = {
  apps: [
    {
      name: "my-app",
      script: "yarn",
      args: "serve",
      cwd: ".",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
