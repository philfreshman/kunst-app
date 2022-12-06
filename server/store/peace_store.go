package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/types"
)

type PeaceStore struct {
	*sqlx.DB
}

func (store PeaceStore) Peaces() ([]types.Peace, error) {
	var peaces []types.Peace

	if err := store.Select(&peaces, `Select * FROM Peaces WHERE IsArchived=FALSE`); err != nil {
		return []types.Peace{}, fmt.Errorf("error getting peaces: %w", err)
	}
	return peaces, nil
}

func (store PeaceStore) PeaceById(id int) (types.Peace, error) {
	var peace types.Peace
	if err := store.Get(&peace, `Select * FROM Peaces WHERE Id=? And IsArchived=FALSE`, id); err != nil {
		return types.Peace{}, fmt.Errorf("error getting peace: %w", err)
	}
	return peace, nil
}

func (store PeaceStore) CreatePeace(order types.Peace) error {
	_, err := store.Exec(`INSERT INTO Peaces VALUES (?,?,?,?,?,?,?,?,?,?)`,
		nil,
		order.ArticleId,
		order.Title,
		order.Width,
		order.Height,
		order.Worth,
		order.IsAvailable,
		order.IsArchived,
		order.ImgUrl,
		order.ArtistId)

	if err != nil {
		return fmt.Errorf("error creating peace: %w", err)
	}
	return nil
}

func (store PeaceStore) PutPeace(order types.Peace) error {
	_, err := store.Exec(`UPDATE Peaces SET 
		ArticleId=?,
		Title=?,
		Width=?,
		Height=?,
		IsAvailable=?,
		IsArchived=?,
		ImgUrl=?,
		ArtistId=?
		WHERE Id=?`,
		order.ArticleId,
		order.Title,
		order.Width,
		order.Height,
		order.Worth,
		order.IsAvailable,
		order.IsArchived,
		order.ImgUrl,
		order.ArtistId,
		order.Id)

	if err != nil {
		return fmt.Errorf("error putting peace: %w", err)
	}
	return nil
}

func (store PeaceStore) DeletePeace(id int) error {
	var peace types.Peace
	if err := store.Get(&peace, `Select * FROM Peaces WHERE Id=?`, id); err != nil {
		return fmt.Errorf("peace doesn't exist: %w", err)
	}

	if peace.IsArchived == true {
		return fmt.Errorf("peace already deleted (archived)")
	}

	_, err := store.Exec(`UPDATE Peaces SET IsArchived=TRUE WHERE Id=?`, id)
	if err != nil {
		return fmt.Errorf("error deleting (archiving) peace: %w", err)
	}
	return nil
}
