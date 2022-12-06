package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/types"
)

type CollectionStore struct {
	*sqlx.DB
}

func (store CollectionStore) Collections() ([]types.Collection, error) {
	var collection []types.Collection

	if err := store.Select(&collection, `Select * FROM Collections WHERE IsArchived=FALSE`); err != nil {
		return []types.Collection{}, fmt.Errorf("error getting peace-collections: %w", err)
	}
	return collection, nil
}

func (store CollectionStore) CollectionById(id int) (types.Collection, error) {
	var collection types.Collection
	if err := store.Get(&collection, `Select * FROM Collections WHERE Id=? AND IsArchived=FALSE`, id); err != nil {
		return types.Collection{}, fmt.Errorf("error getting peace-collection: %w", err)
	}
	return collection, nil
}

func (store CollectionStore) InsertCollection(collection types.Collection) error {
	_, err := store.Exec(`INSERT INTO Collections VALUES (?,?,?)`,
		nil,
		collection.PeaceIds,
		collection.IsArchived,
	)

	if err != nil {
		return fmt.Errorf("error creating peace-collection: %w", err)
	}
	return nil
}

func (store CollectionStore) PutCollection(collection types.Collection) error {
	_, err := store.Exec(
		`UPDATE Collections SET PeaceIds=?, IsArchived=? WHERE Id=?`,
		collection.PeaceIds,
		collection.IsArchived,
		collection.Id,
	)

	if err != nil {
		return fmt.Errorf("error putting collection: %w", err)
	}
	return nil
}

func (store CollectionStore) DeleteCollection(id int) error {
	var collection types.Collection
	if err := store.Get(&collection, `Select * FROM Collections WHERE Id=?`, id); err != nil {
		return fmt.Errorf("colletion doesn't exist: %w", err)
	}

	if collection.IsArchived == true {
		return fmt.Errorf("collection already deleted (archived)")
	}

	_, err := store.Exec(`UPDATE Collections SET IsArchived=TRUE WHERE Id=?`, id)
	if err != nil {
		return fmt.Errorf("error deleting (archiving) collection: %w", err)
	}
	return nil
}
