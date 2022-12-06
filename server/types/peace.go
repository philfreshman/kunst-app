package types

type Peace struct {
	Id          *int     `db:"Id"`
	ArticleId   *string  `db:"ArticleId"`
	Title       *string  `db:"Title"`
	Width       *int     `db:"Width"`
	Height      *int     `db:"Height"`
	Worth       *float32 `db:"Worth"`
	IsAvailable *bool    `db:"IsAvailable"`
	IsArchived  bool     `db:"IsArchived"`
	ImgUrl      *string  `db:"ImgUrl"`
	ArtistId    *int     `db:"ArtistId"`
}
