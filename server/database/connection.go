package database

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"server/util"
	"time"
)

var DB *sqlx.DB

func Connect(config util.Config) (*sqlx.DB, error) {
	db, err := sqlx.Open(config.DBDriver, config.DBSource)
	if err != nil {
		return nil, fmt.Errorf("database arguments not valid: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("establishing connection failed: %w", err)
	}

	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	DB = db

	return db, nil
}
