mysql-docker-run:
	docker run --name institute-sql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -d mysql:latest

mysql-docker-interactive:
	docker exec -it institute-sql mysql --password=secret institute_api

createdb:
	docker exec -it blogs-sql mysql -psecret -e "create database institute_api;"

list-port-pid:
	lsof -ti:3000
	
.PHONY: mysql-docker-run mysql-docker-interactive createdb list-port-pid