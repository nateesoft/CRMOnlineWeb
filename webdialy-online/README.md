## Step to create tests frolder

1. - read directory /components/*
2. - cd in folder components list children [loop]
#. - create tests folder if not exists
#. - create index.test.js if in tests folder if not exists
#. - copy data from components/ContentNotFound/tests/index.test.js in here
3. - copy if not exists tests folder into children/
     * if exists test folder
       - copy if not exists index.test.js into /children/tests/*
# replace line at 4 string_replace "import ${component_name} from '../index';"
# replace line at 6 into "describe('${component_name} components', () => {"
# replace line at 8 string_replace "ContentNotFound" to "${component_name}"
4. replace all line in string_replace "ContentNotFound" to "${compoent_name}"

Start web apps
http://softcrmpkh.dyndns.org:3000/web-daily-online/?data=d2ViZGFpbHlfMDAx
http://localhost:3000/?data=d2ViZGFpbHlfMDAx

$ docker run -i \
    -p 127.0.0.1:3306:3306 \
    -e MYSQL_ROOT_PASSWORD=mysql5password \
    -t mysql:5

# Start Web App
http://localhost:3000/web-daily-online


for test
default_db=d2ViZGFpbHlfMDAx
super@webdaily.io=>super
admin@webdaily.io=>admin
employee@webdaily.io=>employee
member@webdaily.io=>member

for chekc port in use
lsof -i :3000
kill -9 <PID>