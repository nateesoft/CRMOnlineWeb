call git pull origin master
call pm2 delete -s crm-api-service webdaily-online
cd ./webdialy-online/
call pm2 start ecosystem.config.js
cd ../crm-api-service/
call pm2 start ecosystem.config.js
