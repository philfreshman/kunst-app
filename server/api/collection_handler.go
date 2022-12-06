package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/types"
	"strconv"
)

// getCollections executes an SELECT * statement
func (server *Server) getCollections(ctx *gin.Context) {
	data, err := server.store.CollectionStore.Collections()
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// getCollectionById executes an SELECT * ... WHERE ID=id
func (server *Server) getCollectionById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	data, err := server.store.CollectionStore.CollectionById(id)
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// postCollection executes an INSERT statement
func (server *Server) postCollection(ctx *gin.Context) {
	var input types.Collection

	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "data binding failed"})
		return
	}
	err := server.store.CollectionStore.Collection(input)
	if err != nil {
		return
	}
}

// putCollection executes a whole entity update
func (server *Server) putCollection(ctx *gin.Context) {
	var input types.Collection
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}

	if err := server.store.CollectionStore.PutCollection(input); err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}

// deleteCollection executes a soft-delete
func (server *Server) deleteCollection(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "error",
		})
		return
	}

	err = server.store.CollectionStore.DeleteCollection(id)
	if err != nil {
		return
	}
}
