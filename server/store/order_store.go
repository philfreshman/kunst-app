package store

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"server/models"
)

func (store OrderStore) Order(id int) (models.Order, error) {
	var order models.Order
	if err := store.Get(&order, `Select * FROM Orders WHERE Id = $1`, id); err != nil {
		return models.Order{}, fmt.Errorf("error getting order: %w", err)
	}
	return order, nil
}

//err := db.QueryRow("SELECT COALESCE(NULL, '')").Scan(&u.Name)

func (store OrderStore) Orders() ([]models.Order, error) {
	var orders []models.Order

	if err := store.Select(&orders, `Select * FROM Orders`); err != nil {
		return []models.Order{}, fmt.Errorf("error getting orders: %w", err)
	}
	return orders, nil
}

func (store OrderStore) CreateOrder(order *models.Order) error {
	if err := store.Get(order, `INSERT INTO Orders VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
		order.Id,
		order.Sender,
		order.Address1,
		order.Address2,
		order.Address3,
		order.ProductionName,
		order.StartDate,
		order.EndDate,
		order.Tax,
		order.OfferId,
		order.InvoiceId,
		order.PeaceCollectionId); err != nil {
		return fmt.Errorf("error creating thread: %w", err)
	}
	return nil
}

func (store OrderStore) UpdateOrder(aa *models.Order) error {
	//if err := store.Get(aa, `UPDATE Artists SET Name = $1 WHERE Id = $2`,
	//	aa.Name, aa.Id); err != nil {
	//	return fmt.Errorf("error creating thread: %w", err)
	//}
	return nil
}

func (store OrderStore) DeleteOrder(id int) error {
	if _, err := store.Exec(`DELETE FROM Artists WHERE Id = $1`, id); err != nil {
		return fmt.Errorf("error deleting thread: %w", err)
	}
	return nil
}

type OrderStore struct {
	*sqlx.DB
}
