package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/okapie/next8.0-typescript3.3-go1.11/server/interfaces/api"
)

func Run() *gin.Engine {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "DELETE"},
		AllowHeaders:     []string{"Origin"},
		AllowCredentials: true,
	}))
	r.GET("/api/v1/todos", api.GetTodoList)
	r.POST("/api/v1/todo", api.PostTodo)
	r.DELETE("/api/v1/todo", api.DeleteTodo)

	r.Run("localhost:8000")

	return r
}
