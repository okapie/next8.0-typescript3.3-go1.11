import { client } from "../libs/httpClient";

export default class TodosService {
  static async getTodoList() {
    return await client().get(`/todos`)
    .then(response => response.data)
    .catch(error => error.response);
  }

  static async postTodo(parameter: string) {
    return await client()
      .post(`/todo`, parameter)
      .then(response => response.data)
      .catch(error => error.response.data);
  }

  static async deleteTodo(parameter: string) {
    return await client()
      .delete(`/todo?id=${parameter}`)
      .then(response => response.data)
      .catch(error => error.response.data);
  }
}
