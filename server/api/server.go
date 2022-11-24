package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
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

	server.setupRouter()
	return server, nil
}

// Start runs the HTTP server on a specific address.
func (server *Server) Start(config util.Config) error {
	return server.router.Run(config.HTTPServerAddress)
}

// setupRouter defines the use of handlers for the api endpoints
func (server *Server) setupRouter() {
	router := gin.Default()
	router.Use(corsRules())

	router.GET("/", server.threadsList)

	server.router = router
}

func corsRules() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowWildcard:   true,
		AllowAllOrigins: true,
		//AllowOrigins:     []string{"http://localhost:9090"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Origin", "Access-Control-Allow-Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token"},
		ExposeHeaders:    []string{"Access-Control-Allow-Origin"},
		AllowCredentials: true,
	})
}
