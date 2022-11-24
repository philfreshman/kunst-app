package models

import (
	"time"
)

// Bestellung
// Bestellung
// Bestellung

type Order struct {
	Id             int        `db:"Id"`
	Sender         *string    `db:"Sender"`
	Address1       *string    `db:"Address1"`
	Address2       *string    `db:"Address2"`
	Address3       *string    `db:"Address3"`
	ProductionName *string    `db:"ProductionName"`
	StartDate      *time.Time `db:"StartDate"`
	EndDate        *time.Time `db:"EndDate"`
	Tax            *float32   `db:"Tax"`
	// Foreign keys
	OfferId           *int `db:"OfferId"`
	InvoiceId         *int `db:"InvoiceId"`
	PeaceCollectionId *int `db:"PeaceCollectionId"`
}

type OrderStore interface {
	Order(id int) (Artist, error)
	Orders() ([]Artist, error)
	CreateOrder(a *Artist) error
	UpdateOrder(a *Artist) error
	DeleteOrder(id int) error
}
