package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/types"
	"strconv"
)

// getArtists executes an SELECT * statement
func (s *Server) getArtists(ctx *gin.Context) {
	data, err := s.store.ArtistStore.Artists()
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)

}

// getArtistById executes an SELECT * ... WHERE ID=id
func (s *Server) getArtistById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
		})
		return
	}

	data, err := s.store.ArtistStore.ArtistById(id)
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)

}

// postArtist executes an INSERT statement
func (s *Server) postArtist(ctx *gin.Context) {
	var input types.Artist

	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}
	err := s.store.ArtistStore.CreateArtist(input)
	if err != nil {
		return
	}
}

// putOrder executes a whole entity update
func (s *Server) putArtist(ctx *gin.Context) {
	var input types.Artist
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}

	if err := s.store.ArtistStore.PutArtist(input); err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}

// deleteOrder executes a soft-delete
func (s *Server) deleteArtist(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "error",
		})
		return
	}

	err = s.store.ArtistStore.DeleteArtist(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
}
