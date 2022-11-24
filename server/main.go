package main

import (
	"log"
	"server/api"
	"server/database"
	"server/util"
)

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("error getting config file")
	}

	db, err := database.Connect(config)
	if err != nil {
		log.Fatal("error connecting to database: ", err)
	}

	server, err := api.NewServer(config, db)
	if err != nil {
		log.Fatal()
	}

	err = server.Start(config)
	if err != nil {
		log.Fatal("cannot start server: %w", err)
	}
}
