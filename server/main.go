package main

import (
    "encoding/json"
    "log"
    "net/http"

    "github.com/gorilla/mux"
    "github.com/gorilla/handlers"
    "github.com/jinzhu/gorm"
    _ "github.com/go-sql-driver/mysql"
    _ "github.com/jinzhu/gorm/dialects/mysql"
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

type Tb_Todos []Tb_Todo

func gormConnect() *gorm.DB {
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

func getTodoList(w http.ResponseWriter, r *http.Request) {
    db := gormConnect()
    defer db.Close()

    todos := []Tb_Todo{}
    db.Find(&todos)

    bytes, _ := json.Marshal(&todos)
    w.Write(bytes)
}

func postTodo(w http.ResponseWriter, r *http.Request) {
    defer r.Body.Close()

    db := gormConnect()
    defer db.Close()

    var tb_todo Tb_Todo
    json.NewDecoder(r.Body).Decode(&tb_todo)
    newTodo := db.Create(&tb_todo)
    json.NewEncoder(w).Encode(&tb_todo)

    result := PostResult{http.StatusOK, true, newTodo}
    json.Marshal(result)

    w.Header().Set("Content-Type", "application/json")
}

func deleteTodo(w http.ResponseWriter, r *http.Request) {
    db := gormConnect()
    item := r.URL.Query().Get("id")

    var tb_todo Tb_Todo
    db.First(&tb_todo, item)
    db.Delete(&tb_todo)

    var tb_todos []Tb_Todo
    db.Find(&tb_todos)
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
