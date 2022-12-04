package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/models"
)

func (store ArtistStore) Artists() ([]models.Artist, error) {
	artist := []models.Artist{}

	if err := store.Select(&artist, `Select * FROM Artists`); err != nil {
		return []models.Artist{}, fmt.Errorf("error getting orders: %w", err)
	}
	return artist, nil
}

func (store ArtistStore) ArtistById(id int) (models.Artist, error) {
	var artist models.Artist
	if err := store.Get(&artist, `Select * FROM Artists WHERE Id = ?`, id); err != nil {
		return models.Artist{}, fmt.Errorf("error getting artist: %w", err)
	}
	return artist, nil
}

func (store ArtistStore) CreateArtist(artist models.Artist) error {
	_, err := store.Exec(`INSERT INTO Artists VALUES (?,?,?)`,
		nil,
		artist.Name,
		nil)

	if err != nil {
		return fmt.Errorf("error creating artist: %w", err)
	}

	return nil
}

func (store ArtistStore) PutArtist(artist models.Artist) error {
	_, err := store.Exec(`UPDATE Artists SET
		Name=?,
		IsArchived=?
		WHERE Id=?`,
		artist.Name,
		artist.IsArchived,
		artist.Id,
	)

	if err != nil {
		return fmt.Errorf("error creating artist: %w", err)
	}

	return nil
}

func (store ArtistStore) DeleteArtist(id int) error {
	if _, err := store.Exec(`UPDATE Artists SET IsArchived=true WHERE Id = ?`, id); err != nil {
		return fmt.Errorf("error deleting (archiving) artist: %w", err)
	}
	return nil
}

type ArtistStore struct {
	*sqlx.DB
}
