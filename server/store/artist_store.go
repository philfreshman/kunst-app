package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/types"
)

func (store ArtistStore) Artists() ([]types.Artist, error) {
	artist := []types.Artist{}

	if err := store.Select(&artist, `Select * FROM Artists WHERE IsArchived=FALSE`); err != nil {
		return []types.Artist{}, fmt.Errorf("error getting orders: %w", err)
	}
	return artist, nil
}

func (store ArtistStore) ArtistById(id int) (types.Artist, error) {
	var artist types.Artist
	if err := store.Get(&artist, `Select * FROM Artists WHERE Id=? AND IsArchived=FALSE`, id); err != nil {
		return types.Artist{}, fmt.Errorf("error getting artist: %w", err)
	}
	return artist, nil
}

func (store ArtistStore) CreateArtist(artist types.Artist) error {
	_, err := store.Exec(`INSERT INTO Artists VALUES (?,?,?)`,
		nil,
		artist.Name,
		nil)

	if err != nil {
		return fmt.Errorf("error creating artist: %w", err)
	}

	return nil
}

func (store ArtistStore) PutArtist(artist types.Artist) error {
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
	if _, err := store.Exec(`UPDATE Artists SET IsArchived=TRUE WHERE Id=?`, id); err != nil {
		return fmt.Errorf("error deleting (archiving) artist: %w", err)
	}
	return nil
}

type ArtistStore struct {
	*sqlx.DB
}
