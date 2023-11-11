import TaskController from "./controller/taskController.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const taskController = new TaskController();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { id } = req.query;
      const response = taskController.ListTask(id);
      return res.end(JSON.stringify(response));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const response = taskController.createTask(req);
      if (response == "error") {
        return res.writeHead(400).end();
      }
      return res.end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      taskController.updateTask(req, req.params.id);
      return res.end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      taskController.deleteTask(req.params.id);
      return res.end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      taskController.completeTask(req.params.id);
      return res.end();
    },
  },
];
