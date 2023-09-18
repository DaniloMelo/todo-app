import { NextApiRequest, NextApiResponse } from "next";
import { read } from "@db-crud";

function get(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    todoList: read(),
  });
}
export const todoController = {
  get,
};
