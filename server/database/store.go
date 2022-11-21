package database

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/philfreshman/kunstapp/types"
)

func NewStore(dataSourceName string) (*Store, error) {
	db, err := sqlx.Open("mysql", dataSourceName)
	if err != nil {
		return nil, fmt.Errorf("error opening database: %w", err)
	}
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("error connecting to database: %w", err)
	}

	return &Store{
		ArtistStore: NewArtistStore(db),
		PeaceStore:  NewPeaceStore(db),
	}, nil
}

type Store struct {
	types.ArtistStore
	types.PeaceStore
}
