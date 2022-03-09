psql-docker-run:
	docker run --name institute-sql -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres 

psql-docker-interactive:
	docker exec -it institute-sql psql -U root -d institute_api

createdb:
	docker exec -it institute-sql createdb --username=root --owner=root institute_api

dropdb:
	docker exec -it institute-sql dropdb --username=root institute_api

list-port-pid:
	lsof -ti:4000
	
.PHONY: psql-docker-run psql-docker-interactive createdb list-port-pid dropdb