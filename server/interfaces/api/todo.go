package api

import (
	"github.com/gin-gonic/gin"
	"github.com/okapie/next8.0-typescript3.3-go1.11/server/infrastructure/db"
	"github.com/okapie/next8.0-typescript3.3-go1.11/server/entities"
)

func GetTodoList (c *gin.Context) {
	gormDb := db.Open()
	defer gormDb.Close()

	todos := []entities.Tb_Todo{}
	gormDb.Find(&todos)

	c.JSON(200, &todos)
}

func PostTodo (c *gin.Context) {
	gormDb := db.Open()
	defer gormDb.Close()

	var tb_todo entities.Tb_Todo
	c.BindJSON(&tb_todo)
	gormDb.Create(&tb_todo)

	c.JSON(200, &tb_todo)
}

func DeleteTodo (c *gin.Context) {
	gormDb := db.Open()
	defer gormDb.Close()

	q := c.Request.URL.Query()
	item := q["id"]

	var tb_todo entities.Tb_Todo
	gormDb.First(&tb_todo, item)
	gormDb.Delete(&tb_todo)

	c.JSON(200, &tb_todo)
}
