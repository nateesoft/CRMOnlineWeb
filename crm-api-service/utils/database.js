const exec = require('child_process').exec;
exec('docker exec f0fb1593900c /usr/bin/mysqldump -u root --password=mysql5password webdaily_001 > init_db.sql')
exec('docker exec f0fb1593900c /usr/bin/mysqldump -u root --password=mysql5password webdaily_001 member redeem > webdaily_001.sql')
