package types

import "time"

type Offer struct {
	Id         int       `db:"Id"`
	SetName    string    `db:"SetName"`
	OfferDate  time.Time `db:"OfferDate"`
	Text1      string    `db:"Text1"`
	Text2      string    `db:"Text2"`
	IsArchived bool      `db:"IsArchived"`
}
