module.exports = {
  apps : [{
    name: 'crm-api-service',
    script: 'app.js',
    instances: 4,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
  },]
};
