package store

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

func CreateStore(db *sqlx.DB) *Store {
	return &Store{
		OrderStore:      &OrderStore{DB: db},
		ArtistStore:     &ArtistStore{DB: db},
		PeaceStore:      &PeaceStore{DB: db},
		CollectionStore: &CollectionStore{DB: db},
	}
}

type Store struct {
	*OrderStore
	*ArtistStore
	*PeaceStore
	*CollectionStore
}
