package usecases

import (
	"github.com/okapie/next8.0-typescript3.3-go1.11/server/entities"
	"github.com/okapie/next8.0-typescript3.3-go1.11/server/infrastructure/db"
)

func GetTodoList (todos *[]entities.Tb_Todo) (err error) {
	gormDb := db.Open()
	defer gormDb.Close()

	if err = gormDb.Find(&todos).Error; err != nil {
		return err
	}

	return nil
}

func PostTodo (tb_todo *entities.Tb_Todo) (err error) {
	gormDb := db.Open()
	defer gormDb.Close()

	if err = gormDb.Create(tb_todo).Error; err != nil {
		return err
	}

	return nil
}

func DeleteTodo (tb_todo *entities.Tb_Todo, id string) (err error) {
	gormDb := db.Open()
	defer gormDb.Close()

	gormDb.Where("id = ?", id).Delete(tb_todo)
	return nil
}
