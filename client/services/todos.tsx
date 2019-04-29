import { client } from "../libs/httpClient";

export default class TodosService {
  static async getTodoList(): Promise<Object> {
    return await client()
      .get(`/todos`)
      .then(response => response.data)
      .catch(error => error.response);
  }

  static async postTodo(parameter: string): Promise<Object> {
    return await client()
      .post(`/todo`, { item: parameter })
      .then(response => response)
      .catch(error => error.response.data);
  }

  static async deleteTodo(parameter: number): Promise<Object> {
    return await client()
      .delete(`/todo?id=${parameter}`)
      .then(response => response)
      .catch(error => error.response.data);
  }
}
