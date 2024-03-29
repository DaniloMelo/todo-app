import { NextApiRequest, NextApiResponse } from "next";
import { todoController } from "@server/controller/todoController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);

  if (req.method === "GET") {
    todoController.get(req, res);
    return;
  }

  res.status(405).json({
    message: "Method not allowed",
  });
}
