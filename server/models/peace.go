package models

type Peace struct {
	Id          int     `db:"Id"`
	ArticleId   string  `db:"ArticleId"`
	Title       string  `db:"Title"`
	Dimensions  string  `db:"Dimensions"`
	Description string  `db:"PrudictionName"`
	Worth       float32 `db:"Worth"`
	Price       float32 `db:"Price"`
	IsAvailable bool    `db:"IsAvailable"`
	ArtistId    int     `db:"ArtistId"`
}

// edited
// edited
// edited

type PeaceStore interface {
	Peace(id int) (Peace, error)
	Peaces() ([]Peace, error)
	CreatePeace(a *Peace) error
	UpdatePeace(a *Peace) error
	DeleteThread(id int) error
}
