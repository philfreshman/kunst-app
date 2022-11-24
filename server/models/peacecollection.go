package models

type PeaceCollection struct {
	Id         int    `db:"Id"`
	Collection string `db:"Collection"`
}
