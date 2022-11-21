mysql:
	docker-compose up

migrate:
	migrate -source file://database/migrations -database 'mysql://admin:pass@tcp(localhost:3306)/KunstApp' up
