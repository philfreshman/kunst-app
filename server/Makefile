mysql:
	docker-compose up

migrate-up:
	migrate -source file://migrations -database 'mysql://admin:pass@tcp(localhost:3306)/KunstApp' up

migrate-down:
	migrate -source file://migrations -database 'mysql://admin:pass@tcp(localhost:3306)/KunstApp' down
