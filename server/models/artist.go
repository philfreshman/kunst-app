package models

type Artist struct {
	Id         *int    `db:"Id"`
	Name       *string `db:"Name"`
	IsArchived *bool   `db:"IsArchived"`
}

// not used

//type ArtistStore interface {
//	Artist(id int) (Artist, error)
//	Artists() ([]Artist, error)
//	CreateArtist(a *Artist) error
//	UpdateArtist(a *Artist) error
//	DeleteThread(id int) error
//}
