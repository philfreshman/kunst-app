package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/models"
	"strconv"
)

// getPeaces executes an SELECT * statement
func (server *Server) getPeaces(ctx *gin.Context) {
	data, err := server.store.PeaceStore.Peaces()
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// getPeaceById executes an SELECT * ... WHERE ID=id
func (server *Server) getPeaceById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	data, err := server.store.PeaceStore.PeaceById(id)
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// postPeace executes an INSERT statement
func (server *Server) postPeace(ctx *gin.Context) {
	var input models.Peace

	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "data binding failed"})
		return
	}
	err := server.store.PeaceStore.CreatePeace(input)
	if err != nil {
		return
	}
}

// putPeace executes a whole entity update
func (server *Server) putPeace(ctx *gin.Context) {
	var input models.Peace
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}

	if err := server.store.PeaceStore.PutPeace(input); err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}

// deletePeace executes a soft-delete
func (server *Server) deletePeace(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "error",
		})
		return
	}

	err = server.store.PeaceStore.DeletePeace(id)
	if err != nil {
		return
	}
}
