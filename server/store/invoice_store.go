package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/types"
)

type InvoiceStore struct {
	*sqlx.DB
}

func (store InvoiceStore) Invoices() ([]types.Invoice, error) {
	var invoices []types.Invoice

	if err := store.Select(&invoices, `Select * FROM Invoices WHERE IsArchived=FALSE`); err != nil {
		return []types.Invoice{}, fmt.Errorf("error getting invoices: %w", err)
	}
	return invoices, nil
}

func (store InvoiceStore) InvoiceById(id int) (types.Invoice, error) {
	var invoice types.Invoice
	if err := store.Get(&invoice, `Select * FROM Invoices WHERE Id=? And IsArchived=FALSE`, id); err != nil {
		return types.Invoice{}, fmt.Errorf("error getting invoice: %w", err)
	}
	return invoice, nil
}

func (store InvoiceStore) CreateInvoice(invoice types.Invoice) error {
	_, err := store.Exec(`INSERT INTO Invoices VALUES (?,?,?,?,?,?,?)`,
		nil,
		invoice.InvoiceDate,
		invoice.InvoiceNr,
		invoice.Description,
		invoice.Text1,
		invoice.Text2,
		invoice.IsArchived)

	if err != nil {
		return fmt.Errorf("error creating invoice: %w", err)
	}
	return nil
}

func (store InvoiceStore) PutInvoice(invoice types.Invoice) error {
	_, err := store.Exec(`UPDATE Invoices SET 
		InvoiceDate=?,
		InvoiceNr=?,
		Description=?,
		Text1=?,
		Text2=?,
		IsArchived=? 
		WHERE Id=?`,
		invoice.InvoiceDate,
		invoice.InvoiceNr,
		invoice.Description,
		invoice.Text1,
		invoice.Text2,
		invoice.IsArchived,
		invoice.Id)

	if err != nil {
		return fmt.Errorf("error putting invoice: %w", err)
	}
	return nil
}

func (store InvoiceStore) DeleteInvoice(id int) error {
	var invoice types.Invoice
	if err := store.Get(&invoice, `Select * FROM Invoices WHERE Id=?`, id); err != nil {
		return fmt.Errorf("invoice doesn't exist: %w", err)
	}

	if invoice.IsArchived == true {
		return fmt.Errorf("invoice already deleted (archived)")
	}

	_, err := store.Exec(`UPDATE Invoices SET IsArchived=TRUE WHERE Id=?`, id)
	if err != nil {
		return fmt.Errorf("error deleting (archiving) invoice: %w", err)
	}
	return nil
}
