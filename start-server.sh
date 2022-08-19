#!/bin/bash
pm2 delete all
cd ./webdialy-online/
pm2 start ecosystem.config.js
cd ../crm-api-service/
pm2 start ecosystem.config.js
cd ../image-uploader-service/
pm2 start ecosystem.config.js
