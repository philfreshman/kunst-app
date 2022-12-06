package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/types"
)

type OrderStore struct {
	*sqlx.DB
}

func (store OrderStore) Orders() ([]types.Order, error) {
	var orders []types.Order

	if err := store.Select(&orders, `Select * FROM Orders WHERE IsArchived=FALSE`); err != nil {
		return []types.Order{}, fmt.Errorf("error getting orders: %w", err)
	}
	return orders, nil
}

func (store OrderStore) OrderById(id int) (types.Order, error) {
	var order types.Order
	if err := store.Get(&order, `Select * FROM Orders WHERE Id=? AND IsArchived=FALSE`, id); err != nil {
		return types.Order{}, fmt.Errorf("error getting order: %w", err)
	}
	return order, nil
}

func (store OrderStore) CreateOrder(order types.Order) error {
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
		order.CollectionId)

	if err != nil {
		return fmt.Errorf("error creating order: %w", err)
	}

	return nil
}

func (store OrderStore) PutOrder(order types.Order) error {
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
		CollectionId=?
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
		order.CollectionId,
		order.Id)

	if err != nil {
		return fmt.Errorf("error putting order: %w", err)
	}

	return nil
}

func (store OrderStore) DeleteOrder(id int) error {
	var order types.Order
	if err := store.Get(&order, `Select * FROM Orders WHERE Id=?`, id); err != nil {
		return fmt.Errorf("order doesn't exist: %w", err)
	}

	if order.IsArchived == true {
		return fmt.Errorf("order already deleted (archived)")
	}

	_, err := store.Exec(`UPDATE Orders SET IsArchived=TRUE WHERE Id=?`, id)
	if err != nil {
		return fmt.Errorf("error deleting (archiving) collection: %w", err)
	}
	return nil
}
