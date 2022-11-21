package database

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"time"
)

var DB *sql.DB

const (
	dbDriver = "mysql"
	dbSource = "admin:pass@tcp(127.0.0.1:3306)/KunstApp?charset=utf8mb4&parseTime=True&loc=Local"
)

func Connect() {
	db, err := sql.Open("mysql", dbSource)
	if err != nil {
		log.Fatal("Cannot connect do db", err)
	}

	DB = db

	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

}
