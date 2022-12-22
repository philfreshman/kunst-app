package types

import "time"

type Invoice struct {
	Id          int       `db:"Id"`
	Date        time.Time `db:"Date"`
	InvoiceNr   string    `db:"InvoiceNr"`
	Description string    `db:"Description"`
	Text1       string    `db:"Text1"`
	Text2       string    `db:"Text2"`
	IsArchived  bool      `db:"IsArchived"`
}
