package models

type Peace struct {
	Id          int     `db:"Id"`
	ArticleId   string  `db:"ArticleId"`
	ImgUrl      string  `db:"ImgUrl"`
	Title       string  `db:"Title"`
	Dimensions  string  `db:"Dimensions"`
	Worth       float32 `db:"Worth"`
	IsAvailable bool    `db:"IsAvailable"`
	IsArchived  bool    `db:"IsArchived"`
	ArtistId    int     `db:"ArtistId"`
}

// edited
// edited
// edited
