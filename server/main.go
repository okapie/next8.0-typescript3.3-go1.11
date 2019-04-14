package main

import (
    "encoding/json"
    "log"
    "net/http"
    "database/sql"
    "io/ioutil"

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

type ResultType struct {
    Status  int    `json:"status"`
    Result  bool   `json:"result"`
}

type Tb_Todos []Tb_Todo

func openDB() (db *sql.DB) {
    dbDriver := "mysql"
    dbUser := "root"
    dbPassword := "password"
    dbName := "db_todos"
    db, err := sql.Open(dbDriver, dbUser+":"+dbPassword+"@/"+dbName)
    if err != nil {
        panic(err.Error())
    }
    return db
}

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
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        log.Fatal(err)
    }

    db := openDB()
    item := string(body)
    record, err := db.Prepare("INSERT INTO Tb_Todos(item) VALUES(?)")
    if err != nil {
        panic(err.Error())
    }
    record.Exec(item)
    log.Println("INSERT Item: " + item)

    resultType := ResultType{http.StatusOK, true}
    res, err := json.Marshal(resultType)
    w.Write(res)

    defer db.Close()
}

func deleteTodo(w http.ResponseWriter, r *http.Request) {
    db := openDB()
    item := r.URL.Query().Get("id")
    record, err := db.Prepare("DELETE FROM Tb_Todos WHERE id=?")
    if err != nil {
        panic(err.Error())
    }
    record.Exec(item)
    log.Println("DELETE Item: " + item)

    resultType := ResultType{http.StatusOK, true}
    res, err := json.Marshal(resultType)
    w.Write(res)

    defer db.Close()
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
