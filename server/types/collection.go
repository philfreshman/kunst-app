package types

// Collection is a set of art-peaces
type Collection struct {
	Id         *int    `db:"Id"`
	PeaceIds   *string `db:"PeaceIds"`
	IsArchived *bool   `db:"IsArchived"`
}
