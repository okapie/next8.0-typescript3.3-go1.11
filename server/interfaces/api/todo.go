package api

import (
	"strconv"
	"github.com/gin-gonic/gin"
	"github.com/okapie/next8.0-typescript3.3-go1.11/server/entities"
	"github.com/okapie/next8.0-typescript3.3-go1.11/server/usecases"
)

func GetTodoList (c *gin.Context) {
	todos := []entities.Tb_Todo{}
	err := usecases.GetTodoList(&todos)

	size := len(todos)

	if size == 0 {
		c.JSON(404, gin.H{"message": "Record not found"})
	}

	if err == nil && size > 0 {
		c.JSON(200, &todos)
	}
}

func PostTodo (c *gin.Context) {
	var tb_todo entities.Tb_Todo
	c.BindJSON(&tb_todo)

	err := usecases.PostTodo(&tb_todo)

	if err == nil {
		c.JSON(200, &tb_todo)
	}
}

func DeleteTodo (c *gin.Context) {
	var tb_todo entities.Tb_Todo
	id := c.Params.ByName("id")
	err := usecases.DeleteTodo(&tb_todo, id)

	todoId, _ := strconv.Atoi(id)

	if todoId == 0 {
		c.JSON(400, gin.H{"message": "Invalid id"})
	}

	if err == nil {
		c.JSON(200, &tb_todo)
	}
}
