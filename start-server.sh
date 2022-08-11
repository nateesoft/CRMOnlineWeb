#!/bin/bash
pm2 delete -s crm-api-service webdaily-online
cd ./webdialy-online/
pm2 start ecosystem.config.js
cd ../crm-api-service/
pm2 start ecosystem.config.js
cd ../image-uploader-service/
pm2 start ecosystem.config.js
