package models

import "time"

// Angebot
// Angebot
// Angebot

type Offer struct {
	Id        int       `db:"Id"`
	Set       string    `db:"Set"`
	OfferDate time.Time `db:"OfferDate"`
	Text1     string    `db:"Text1"`
	Text2     string    `db:"Text2"`
}
