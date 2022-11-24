package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/models"
	"strconv"
)

// getArtists executes an SELECT * statement
func (server *Server) getArtists(ctx *gin.Context) {
	data, err := server.store.ArtistStore.Artists()
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"data":   data,
		"status": "success",
	})
}

// getArtistById executes an SELECT * ... WHERE ID=id
func (server *Server) getArtistById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "error",
		})
		return
	}

	data, err := server.store.ArtistStore.ArtistById(id)
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"data":   data,
		"status": "success",
	})
}

// postArtist executes an INSERT statement
func (server *Server) postArtist(ctx *gin.Context) {
	var input models.Artist

	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}
	err := server.store.ArtistStore.CreateArtist(input)
	if err != nil {
		return
	}
}

// putOrder executes a whole entity update
func (server *Server) putArtist(ctx *gin.Context) {
	var input models.Artist
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}

	if err := server.store.ArtistStore.PutArtist(input); err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}

// deleteOrder executes a soft-delete
func (server *Server) deleteArtist(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "error",
		})
		return
	}

	err = server.store.ArtistStore.DeleteArtist(id)
	if err != nil {
		return
	}
}
