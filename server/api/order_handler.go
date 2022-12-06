package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/types"
	"strconv"
)

// getOrders executes an SELECT * statement
func (server *Server) getOrders(ctx *gin.Context) {
	data, err := server.store.OrderStore.Orders()
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"data":   data,
		"status": "success",
	})
}

// getOrderById executes an SELECT * ... WHERE ID=id
func (server *Server) getOrderById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "error",
		})
		return
	}

	data, err := server.store.OrderStore.OrderById(id)
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"data":   data,
		"status": "success",
	})
}

// postOrder executes an INSERT statement
func (server *Server) postOrder(ctx *gin.Context) {
	var input types.Order

	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}
	err := server.store.OrderStore.CreateOrder(input)
	if err != nil {
		return
	}
}

// putOrder executes a whole entity update
func (server *Server) putOrder(ctx *gin.Context) {
	var input types.Order
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}

	if err := server.store.OrderStore.PutOrder(input); err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}

// deleteOrder executes a soft-delete
func (server *Server) deleteOrder(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "error",
		})
		return
	}

	err = server.store.OrderStore.DeleteOrder(id)
	if err != nil {
		return
	}
}
