mysql-create:
	docker-compose -p "kunst-app" up

mysql-start:
	docker start mysql

mysql-stop:
	docker kill mysql

migrate-up:
	migrate -source file://migrations -database 'mysql://admin:pass@tcp(localhost:3306)/KunstApp' up

migrate-down:
	migrate -source file://migrations -database 'mysql://admin:pass@tcp(localhost:3306)/KunstApp' down

run:
	air
