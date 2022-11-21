package server

import "github.com/philfreshman/kunstapp/database"

func main() {
	database.Connect()

	app := gin.Default()

	router.SetupRouter(app)
	app.Use(router.Custom())

	app.Run(":5050")
}
