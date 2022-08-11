module.exports = {
  apps : [{
    name: 'image-uploader-service',
    script: 'app.js',
    instances: 1,
    autorestart: false,
    watch: false,
    max_memory_restart: '2G',
  },]
};
