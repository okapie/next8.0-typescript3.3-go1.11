package main

import (
    _ "github.com/go-sql-driver/mysql"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "github.com/okapie/next8.0-typescript3.3-go1.11/server/db"
)

type Tb_Todo struct {
    Id      int    `json:"id"`
    Item    string `json:"item"`
}

func getTodoList (c *gin.Context) {
    gormDb := db.Open()
    defer gormDb.Close()

    todos := []Tb_Todo{}
    gormDb.Find(&todos)

    c.JSON(200, &todos)
}

func postTodo (c *gin.Context) {
    gormDb := db.Open()
    defer gormDb.Close()

    var tb_todo Tb_Todo
    c.BindJSON(&tb_todo)
    gormDb.Create(&tb_todo)

    c.JSON(200, &tb_todo)
}

func deleteTodo (c *gin.Context) {
    gormDb := db.Open()
    defer gormDb.Close()

    q := c.Request.URL.Query()
    item := q["id"]

    var tb_todo Tb_Todo
    gormDb.First(&tb_todo, item)
    gormDb.Delete(&tb_todo)

    c.JSON(200, &tb_todo)
}

func main() {
    r := gin.Default()
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"GET", "POST", "DELETE"},
        AllowHeaders:     []string{"Origin"},
        AllowCredentials: true,
    }))
    r.GET("/api/v1/todos", getTodoList)
    r.POST("/api/v1/todo", postTodo)
    r.DELETE("/api/v1/todo", deleteTodo)

    r.Run("localhost:8000")
}
