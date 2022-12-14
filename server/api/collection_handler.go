package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/types"
	"strconv"
)

// getCollections executes an SELECT * statement
func (s *Server) getCollections(ctx *gin.Context) {
	data, err := s.store.CollectionStore.Collections()
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// getCollectionById executes an SELECT * ... WHERE ID=id
func (s *Server) getCollectionById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, nil)
		return
	}

	data, err := s.store.CollectionStore.CollectionById(id)
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// postCollection executes an INSERT statement
func (s *Server) postCollection(ctx *gin.Context) {
	var input types.Collection

	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "data binding failed"})
		return
	}
	err := s.store.CollectionStore.InsertCollection(input)
	if err != nil {
		return
	}
}

// putCollection executes a whole entity update
func (s *Server) putCollection(ctx *gin.Context) {
	var input types.Collection
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}

	if err := s.store.CollectionStore.PutCollection(input); err != nil {
		return
	}
	ctx.Status(http.StatusOK)
}

// deleteCollection executes a soft-delete
func (s *Server) deleteCollection(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	err = s.store.CollectionStore.DeleteCollection(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
}
