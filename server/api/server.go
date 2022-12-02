package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"server/middleware"
	"server/store"
	"server/util"
)

type Server struct {
	router *gin.Engine
	store  store.Store
	config util.Config
}

// NewServer creates a new HTTP server and set up routing.
func NewServer(config util.Config, db *sqlx.DB) (*Server, error) {
	server := &Server{
		config: config,
		store:  *store.CreateStore(db),
	}
	app := gin.Default()

	server.setupRouter(app)
	app.Use(corsRules())

	return server, nil
}

// Start runs the HTTP server on a specific address.
func (server *Server) Start(config util.Config) error {
	return server.router.Run(config.HTTPServerAddress)
}

// setupRouter defines the use of handlers for the api endpoints
func (server *Server) setupRouter(app *gin.Engine) {
	api := app.Group("/api", middleware.Headers())

	orders := api.Group("/order")
	orders.GET("/", server.getOrders)
	orders.GET("/:id", server.getOrderById)
	orders.POST("/", server.postOrder)
	orders.PUT("/", server.putOrder)
	orders.DELETE("/:id", server.deleteOrder)

	artists := api.Group("/artist", middleware.Headers())
	artists.GET("/", server.getArtists)
	artists.GET("/:id", server.getArtistById)
	artists.POST("/", server.postArtist)
	artists.PUT("/", server.putArtist)
	artists.DELETE("/:id", server.deleteArtist)

	server.router = app
}

// corsRules defines the incoming HTTP request rules
func corsRules() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowWildcard: true,
		//AllowAllOrigins:  true,
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"},
		AllowHeaders:     []string{"Authorization", "Origin", "Access-Control-Allow-Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token"},
		ExposeHeaders:    []string{"Access-Control-Allow-Origin"},
		AllowCredentials: true,
	})
}
