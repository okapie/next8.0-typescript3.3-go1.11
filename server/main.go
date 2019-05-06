package main

import (
    _ "github.com/go-sql-driver/mysql"
    "github.com/okapie/next8.0-typescript3.3-go1.11/server/infrastructure/server"
)

func main() {
    server.Run()
}
