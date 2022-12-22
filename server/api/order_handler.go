package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/types"
	"strconv"
)

// getOrders executes an SELECT * statement
func (s *Server) getOrders(ctx *gin.Context) {
	data, err := s.store.OrderStore.Orders()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// getOrderById executes an SELECT * ... WHERE ID=id
func (s *Server) getOrderById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "error",
		})
		return
	}

	data, err := s.store.OrderStore.OrderById(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// postOrder executes an INSERT statement
func (s *Server) postOrder(ctx *gin.Context) {
	var input types.Order

	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}
	err := s.store.OrderStore.CreateOrder(input)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusCreated)
}

// putOrder executes a whole entity update
func (s *Server) putOrder(ctx *gin.Context) {
	var input types.Order
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}

	if err := s.store.OrderStore.PutOrder(input); err != nil {
		return
	}
	ctx.Status(http.StatusOK)
}

// deleteOrder executes a soft-delete
func (s *Server) deleteOrder(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "error",
		})
		return
	}

	err = s.store.OrderStore.DeleteOrder(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
	ctx.Status(http.StatusOK)
}
