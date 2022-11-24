package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (server *Server) threadsList(ctx *gin.Context) {
	data, err := server.store.Orders()
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"data":   data,
		"status": "success",
	})
}
