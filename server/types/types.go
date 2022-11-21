package types

type Artist struct {
	Id   int    `db:"Id"`
	Name string `db:"Title"`
}

type Peace struct {
	Id          int    `db:"Id"`
	Title       string `db:"Title"`
	Description string `db:"Description"`
	IsAvailable bool   `db:"IsAvailable"`
	ArtistId    int    `db:"ArtistId"`
}

type Order struct {
	Id          int    `db:"Id"`
	Title       string `db:"Title"`
	Description string `db:"Description"`
	OfferId     int    `db:"OfferId"`
	InvoiceId   int    `db:"InvoiceId"`
}

type Offer struct {
	Id          int    `db:"Id"`
	Title       string `db:"Title"`
	Description string `db:"Description"`
}

type Invoice struct {
	Id          int    `db:"Id"`
	Title       string `db:"Title"`
	Description string `db:"Description"`
}

type PeaceCollection struct {
	Id         int    `db:"Id"`
	Collection string `db:"Collection"`
}

type ArtistStore interface {
	Artist(id int) (Artist, error)
	Artists() ([]Artist, error)
	CreateArtist(a *Artist) error
	UpdateArtist(a *Artist) error
	DeleteThread(id int) error
}

type PeaceStore interface {
	Peace(id int) (Peace, error)
	Peaces() ([]Peace, error)
	CreatePeace(a *Peace) error
	UpdatePeace(a *Peace) error
	DeleteThread(id int) error
}

type Store interface {
	ArtistStore
	PeaceStore
}
