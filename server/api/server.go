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
func (s *Server) Start(config util.Config) error {
	return s.router.Run(config.HTTPServerAddress)
}

// setupRouter defines the use of handlers for the api endpoints
func (s *Server) setupRouter(app *gin.Engine) {
	api := app.Group("/api", middleware.Headers())

	orders := api.Group("/order")
	orders.GET("/", s.getOrders)
	orders.GET("/:id", s.getOrderById)
	orders.POST("/", s.postOrder)
	orders.PUT("/", s.putOrder)
	orders.DELETE("/:id", s.deleteOrder)

	artists := api.Group("/artist")
	artists.GET("/", s.getArtists)
	artists.GET("/:id", s.getArtistById)
	artists.POST("/", s.postArtist)
	artists.PUT("/", s.putArtist)
	artists.DELETE("/:id", s.deleteArtist)

	peaces := api.Group("/peace")
	peaces.GET("/", s.getPeaces)
	peaces.GET("/:id", s.getPeaceById)
	peaces.POST("/", s.postPeace)
	peaces.PUT("/", s.putPeace)
	peaces.DELETE("/:id", s.deletePeace)

	collections := api.Group("/collection")
	collections.GET("/", s.getCollections)
	collections.GET("/:id", s.getCollectionById)
	collections.POST("/", s.postCollection)
	collections.PUT("/", s.putCollection)
	collections.DELETE("/:id", s.deleteCollection)

	offers := api.Group("/offer")
	offers.GET("/", s.getOffers)
	offers.GET("/:id", s.getOfferById)
	offers.POST("/", s.postOffer)
	offers.PUT("/", s.putOffer)
	offers.DELETE("/:id", s.deleteOffer)

	invoices := api.Group("/invoice")
	invoices.GET("/", s.getInvoices)
	invoices.GET("/:id", s.getInvoiceById)
	invoices.POST("/", s.postInvoice)
	invoices.PUT("/", s.putInvoice)
	invoices.DELETE("/:id", s.deleteInvoice)

	s.router = app
}

// corsRules defines the incoming HTTP request rules
func corsRules() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowWildcard:   true,
		AllowAllOrigins: true,
		//AllowOrigins:     []string{"http://localhost:9000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"},
		AllowHeaders:     []string{"Authorization", "Origin", "Access-Control-Allow-Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token"},
		ExposeHeaders:    []string{"Access-Control-Allow-Origin"},
		AllowCredentials: true,
	})
}
