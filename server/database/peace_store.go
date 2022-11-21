package database

import (
	"github.com/jmoiron/sqlx"
	"github.com/philfreshman/kunstapp/types"
)

func NewPeaceStore(db *sqlx.DB) *ArtistStore {
	return &ArtistStore{
		DB: db,
	}
}

func (store ArtistStore) Peace(id int) (types.Peace, error) {
	panic("implement me")
}

func (store ArtistStore) Peaces() ([]types.Peace, error) {
	panic("implement me")
}

func (store ArtistStore) CreatePeace(a *types.Peace) error {
	panic("implement me")
}

func (store ArtistStore) UpdatePeace(a *types.Peace) error {
	panic("implement me")
}
