package main

import (
    "encoding/json"
    "log"
    "net/http"

    _ "github.com/go-sql-driver/mysql"
    "github.com/gorilla/handlers"
    "github.com/gorilla/mux"
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"

    "github.com/okapie/next8.0-typescript3.3-go1.11/server/db"
)

type Tb_Todo struct {
    Id      int    `json:"id"`
    Item    string `json:"item"`
}

type PostResult struct {
    Status  int    `json:"status"`
    Result  bool   `json:"result"`
    Data    *gorm.DB `json:"data"`
}

type DeleteResult struct {
    Status  int    `json:"status"`
    Result  bool   `json:"result"`
}

func getTodoList(w http.ResponseWriter, r *http.Request) {
    gormDb := db.Open()
    defer gormDb.Close()

    todos := []Tb_Todo{}
    gormDb.Find(&todos)

    bytes, _ := json.Marshal(&todos)
    w.Write(bytes)
}

func postTodo(w http.ResponseWriter, r *http.Request) {
    defer r.Body.Close()

    gormDb := db.Open()
    defer gormDb.Close()

    var tb_todo Tb_Todo
    json.NewDecoder(r.Body).Decode(&tb_todo)
    newTodo := gormDb.Create(&tb_todo)
    json.NewEncoder(w).Encode(&tb_todo)

    result := PostResult{http.StatusOK, true, newTodo}
    json.Marshal(result)

    w.Header().Set("Content-Type", "application/json")
}

func deleteTodo(w http.ResponseWriter, r *http.Request) {
    gormDb := db.Open()
    item := r.URL.Query().Get("id")

    var tb_todo Tb_Todo
    gormDb.First(&tb_todo, item)
    gormDb.Delete(&tb_todo)

    var tb_todos []Tb_Todo
    gormDb.Find(&tb_todos)
    json.NewEncoder(w).Encode(&tb_todos)

    result := DeleteResult{http.StatusOK, true}
    json.Marshal(result)

    w.Header().Set("Content-Type", "application/json")
}

func main() {
    allowedOrigins := handlers.AllowedOrigins([]string{"http://localhost:3000"})
    allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "DELETE", "PUT"})
    allowedHeaders := handlers.AllowedHeaders([]string{"Authorization"})

    r := mux.NewRouter()
    r.HandleFunc("/api/v1/todos", getTodoList).Methods("GET")
    r.HandleFunc("/api/v1/todo", postTodo).Methods("POST")
    r.HandleFunc("/api/v1/todo", deleteTodo).Methods("DELETE")

    log.Fatal(http.ListenAndServe(":8000", handlers.CORS(allowedOrigins, allowedMethods, allowedHeaders)(r)))
}
