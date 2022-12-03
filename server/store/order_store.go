package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/models"
)

func (store OrderStore) Orders() ([]models.Order, error) {
	var orders []models.Order

	if err := store.Select(&orders, `Select * FROM Orders WHERE IsArchived IS NOT true`); err != nil {
		return []models.Order{}, fmt.Errorf("error getting orders: %w", err)
	}
	return orders, nil
}

func (store OrderStore) OrderById(id int) (models.Order, error) {
	var order models.Order
	if err := store.Get(&order, `Select * FROM Orders WHERE Id = ?`, id); err != nil {
		return models.Order{}, fmt.Errorf("error getting order: %w", err)
	}
	return order, nil
}

func (store OrderStore) CreateOrder(order models.Order) error {
	_, err := store.Exec(`INSERT INTO Orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
		nil,
		order.Sender,
		order.Address1,
		order.Address2,
		order.Address3,
		order.ProductionName,
		order.StartDate,
		order.EndDate,
		order.Tax,
		order.IsArchived,
		order.OfferId,
		order.InvoiceId,
		order.PeaceCollectionId)

	if err != nil {
		return fmt.Errorf("error creating order: %w", err)
	}

	return nil
}

func (store OrderStore) PutOrder(order models.Order) error {
	_, err := store.Exec(`UPDATE Orders SET 
		Sender=?,
		Address1=?,
		Address2=?,
		Address3=?,
		ProductionName=?,
		StartDate=?,
		EndDate=?,
		Tax=?,
		IsArchived=?,
		OfferId=?,
		InvoiceId=?,
		PeaceCollectionId=?
		WHERE Id=?`,
		order.Sender,
		order.Address1,
		order.Address2,
		order.Address3,
		order.ProductionName,
		order.StartDate,
		order.EndDate,
		order.Tax,
		order.IsArchived,
		order.OfferId,
		order.InvoiceId,
		order.PeaceCollectionId,
		order.Id)

	if err != nil {
		return fmt.Errorf("error putting order: %w", err)
	}

	return nil
}

func (store OrderStore) DeleteOrder(id int) error {
	if _, err := store.Exec(`UPDATE Orders SET IsArchived=true WHERE Id = ?`, id); err != nil {
		return fmt.Errorf("error deleting (archiving) order: %w", err)
	}
	return nil
}

type OrderStore struct {
	*sqlx.DB
}
