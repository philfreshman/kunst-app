package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/types"
	"strconv"
)

// getInvoices executes an SELECT * statement
func (s *Server) getInvoices(ctx *gin.Context) {
	data, err := s.store.InvoiceStore.Invoices()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// getInvoiceById executes an SELECT * ... WHERE ID=id
func (s *Server) getInvoiceById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	data, err := s.store.InvoiceStore.InvoiceById(id)
	if err != nil {
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// postInvoice executes an INSERT statement
func (s *Server) postInvoice(ctx *gin.Context) {
	var input types.Invoice

	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "data binding failed"})
		return
	}
	err := s.store.InvoiceStore.CreateInvoice(input)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusCreated)
}

// putInvoice executes a whole entity update
func (s *Server) putInvoice(ctx *gin.Context) {
	var input types.Invoice
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(400, gin.H{"status": "data binding failed"})
		return
	}

	if err := s.store.InvoiceStore.PutInvoice(input); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusCreated)
}

// deleteInvoice executes a soft-delete
func (s *Server) deleteInvoice(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	err = s.store.InvoiceStore.DeleteInvoice(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusOK)
}
