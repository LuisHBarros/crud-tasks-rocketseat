import { randomUUID } from "node:crypto";
import { Database } from "../database/database.js";

const dataBase = new Database();

export default class TaskController {
  createTask(req) {
    if (req.body === null) {
      return "error";
    }
    if (req.body.title === undefined || req.body.description === undefined) {
      console.log(req.body);
      console.log("error!");
      return "error";
    }
    const { title, description } = req.body;
    const task = {
      id: randomUUID(),
      title: title,
      description: description,
      created_at: new Date(),
      updated_at: null,
      completed_at: null,
    };
    dataBase.insert("tasks", task);
    return "created";
  }

  ListTask(id) {
    if (id) {
      return dataBase.select("tasks", {
        id: id,
      });
    }
    return dataBase.select("tasks");
  }
  updateTask(req, id) {
    const { title, description } = req.body;
    if (title === undefined || description === undefined) {
      return "error";
    }
    const chosenTask = this.ListTask(id);
    const updatedTask = { ...chosenTask };
    updatedTask[0].title = title;
    updatedTask[0].description = description;
    updatedTask[0].updated_at = new Date();
    dataBase.update("tasks", id, updatedTask[0]);
  }
  deleteTask(id) {
    dataBase.delete("tasks", id);
  }
  completeTask(id) {
    const chosenTask = this.ListTask(id);
    const updatedTask = { ...chosenTask };
    updatedTask[0].completed_at = new Date();
    dataBase.update("tasks", id, updatedTask[0]);
  }
  importTask() {}
}
