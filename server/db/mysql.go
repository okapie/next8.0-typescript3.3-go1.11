package db

import (
    "github.com/jinzhu/gorm"
)

func Open() *gorm.DB {
    dbDriver := "mysql"
    dbUser := "root"
    dbPassword := "password"
    dbName := "db_todos"
    db, err := gorm.Open(dbDriver, dbUser+":"+dbPassword+"@/"+dbName)
    if err != nil {
        panic(err.Error())
    }
    return db
}
