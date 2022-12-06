package types

import "time"

type Invoice struct {
	Id          int       `db:"Id"`
	InvoiceDate time.Time `db:"InvoiceDate"`
	InvoiceNr   string    `db:"InvoiceNr"`
	Description string    `db:"Description"`
	Text1       string    `db:"Text1"`
	Text2       string    `db:"Text2"`
}
