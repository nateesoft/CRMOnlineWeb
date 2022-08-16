module.exports = {
  apps : [{
    name: 'image-uploader-service',
    script: 'bin/www',
    instances: 1,
    autorestart: false,
    watch: false,
    max_memory_restart: '2G',
  },]
};
