package types

type Artist struct {
	Id         *int    `db:"Id"`
	Name       *string `db:"Name"`
	IsArchived bool    `db:"IsArchived"`
}

//type ArtistStore interface {
//	Artist(id int) (Artist, error)
//	Artists() ([]Artist, error)
//	CreateArtist(a *Artist) error
//	UpdateArtist(a *Artist) error
//	DeleteThread(id int) error
//}
