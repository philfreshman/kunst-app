package store

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

func CreateStore(db *sqlx.DB) *Store {
	return &Store{
		OrderStore: &OrderStore{DB: db},
	}
}

type Store struct {
	*OrderStore
}
