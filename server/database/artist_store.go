package database

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/philfreshman/kunstapp/types"
)

func NewArtistStore(db *sqlx.DB) *ArtistStore {
	return &ArtistStore{
		DB: db,
	}
}

func (store ArtistStore) Artist(id int) (types.Artist, error) {
	var artist types.Artist
	if err := store.Get(&artist, `Select * FROM Artists WHERE Id = $1`, id); err != nil {
		return types.Artist{}, fmt.Errorf("error getting artist: %w", err)
	}
	return artist, nil
}

func (store ArtistStore) Artists() ([]types.Artist, error) {
	var artists []types.Artist
	if err := store.Select(&artists, `Select * FROM Artists`); err != nil {
		return []types.Artist{}, fmt.Errorf("error getting artists: %w", err)
	}
	return artists, nil
}

func (store ArtistStore) CreateArtist(aa *types.Artist) error {
	if err := store.Get(aa, `INSERT INTO Artists VALUES ($1, $2)`,
		aa.Id,
		aa.Name); err != nil {
		return fmt.Errorf("error creating thread: %w", err)
	}
	return nil
}

func (store ArtistStore) UpdateArtist(aa *types.Artist) error {
	if err := store.Get(aa, `UPDATE Artists SET Name = $1 WHERE Id = $2`,
		aa.Name, aa.Id); err != nil {
		return fmt.Errorf("error creating thread: %w", err)
	}
	return nil
}

func (store ArtistStore) DeleteThread(id int) error {
	if _, err := store.Exec(`DELETE FROM Artists WHERE Id = $1`, id); err != nil {
		return fmt.Errorf("error deleting thread: %w", err)
	}
	return nil
}

type ArtistStore struct {
	*sqlx.DB
}
