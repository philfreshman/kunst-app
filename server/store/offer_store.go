package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/types"
)

type OfferStore struct {
	*sqlx.DB
}

func (store OfferStore) Offers() ([]types.Offer, error) {
	var offers []types.Offer

	if err := store.Select(&offers, `Select * FROM Offers WHERE IsArchived=FALSE`); err != nil {
		return []types.Offer{}, fmt.Errorf("error getting offers: %w", err)
	}
	return offers, nil
}

func (store OfferStore) OfferById(id int) (types.Offer, error) {
	var offer types.Offer
	if err := store.Get(&offer, `Select * FROM Offers WHERE Id=? And IsArchived=FALSE`, id); err != nil {
		return types.Offer{}, fmt.Errorf("error getting offer: %w", err)
	}
	return offer, nil
}

func (store OfferStore) CreateOffer(offer types.Offer) error {
	_, err := store.Exec(`INSERT INTO Offers VALUES (?,?,?,?,?,?)`,
		nil,
		offer.SetName,
		offer.Date,
		offer.Text1,
		offer.Text2,
		offer.IsArchived)

	if err != nil {
		return fmt.Errorf("error creating offer: %w", err)
	}
	return nil
}

func (store OfferStore) PutOffer(offer types.Offer) error {
	_, err := store.Exec(`UPDATE Offers SET 
		SetName=?,
		Date=?,
		Text1=?,
		Text2=?,
		IsArchived=?
		WHERE Id=?`,
		offer.SetName,
		offer.Date,
		offer.Text1,
		offer.Text2,
		offer.IsArchived,
		offer.Id)

	if err != nil {
		return fmt.Errorf("error putting offer: %w", err)
	}
	return nil
}

func (store OfferStore) DeleteOffer(id int) error {
	var offer types.Offer
	if err := store.Get(&offer, `Select * FROM Offers WHERE Id=?`, id); err != nil {
		return fmt.Errorf("offer doesn't exist: %w", err)
	}

	if offer.IsArchived == true {
		return fmt.Errorf("offer already deleted (archived)")
	}

	_, err := store.Exec(`UPDATE Offers SET IsArchived=TRUE WHERE Id=?`, id)
	if err != nil {
		return fmt.Errorf("error deleting (archiving) offer: %w", err)
	}
	return nil
}
