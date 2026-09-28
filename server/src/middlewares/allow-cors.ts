import { Request, Response, NextFunction } from "express";

const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,OPTIONS`);
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept, Authorization`,
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
};

export default allowCrossDomain;
