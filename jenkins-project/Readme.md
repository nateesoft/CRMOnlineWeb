# step1

docker exec {container_id} cat /var/jenkins_home/secrets/initialAdminPassword

docker exec 9225e158e296 cat /var/jenkins_home/secrets/initialAdminPassword
example data:80be2d4e31ad4fd29e335de86144180b

## step2

docker run -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
example data:
    Jenkins initial setup is required. An admin user has been created and a password generated.
    Please use the following password to proceed to installation:

    a2b0fa258f3844c99ce63bceaf9a684f

docker run --name jenkins-blueocean --rm --detach \
  --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  myjenkins-blueocean:1.1
