package models

import "time"

// Rechnung
// Rechnung
// Rechnung

type Invoice struct {
	Id          int       `db:"Id"`
	InvoiceDate time.Time `db:"InvoiceDate"`
	InvoiceNr   string    `db:"InvoiceNr"`
	Description string    `db:"PrudictionName"`
	Text1       string    `db:"Text1"`
	Text2       string    `db:"Text2"`
}
