package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/models"
)

func NewArtistStore(db *sqlx.DB) *ArtistStore {
	return &ArtistStore{
		DB: db,
	}
}

func (store ArtistStore) Artist(id int) (models.Artist, error) {
	var artist models.Artist
	if err := store.Get(&artist, `Select * FROM Artists WHERE Id = $1`, id); err != nil {
		return models.Artist{}, fmt.Errorf("error getting artist: %w", err)
	}
	return artist, nil
}

func (store ArtistStore) Artists() ([]models.Artist, error) {
	var artists []models.Artist
	if err := store.Select(&artists, `Select * FROM Artists`); err != nil {
		return []models.Artist{}, fmt.Errorf("error getting artists: %w", err)
	}
	return artists, nil
}

func (store ArtistStore) CreateArtist(aa *models.Artist) error {
	if err := store.Get(aa, `INSERT INTO Artists VALUES ($1, $2)`,
		aa.Id,
		aa.Name); err != nil {
		return fmt.Errorf("error creating thread: %w", err)
	}
	return nil
}

func (store ArtistStore) UpdateArtist(aa *models.Artist) error {
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
