package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/types"
	"strconv"
)

// getOffers executes an SELECT * statement
func (s *Server) getOffers(ctx *gin.Context) {
	data, err := s.store.OfferStore.Offers()
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// getOfferById executes an SELECT * ... WHERE ID=id
func (s *Server) getOfferById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	data, err := s.store.OfferStore.OfferById(id)
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// postOffer executes an INSERT statement
func (s *Server) postOffer(ctx *gin.Context) {
	var input types.Offer

	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "data binding failed"})
		return
	}
	err := s.store.OfferStore.CreateOffer(input)
	if err != nil {
		return
	}
}

// putOffer executes a whole entity update
func (s *Server) putOffer(ctx *gin.Context) {
	var input types.Offer
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}

	if err := s.store.OfferStore.PutOffer(input); err != nil {
		return
	}
	ctx.Status(http.StatusOK)
}

// deleteOffer executes a soft-delete
func (s *Server) deleteOffer(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	err = s.store.OfferStore.DeleteOffer(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
}
