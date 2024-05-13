import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT ?? 4000;

const jsonBodyMiddleware = express.json();

const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

app.use(jsonBodyMiddleware);

const db = {
  courses: [
    {
      id: 1,
      title: "front-end",
    },
    { id: 2, title: "back-end" },
    { id: 3, title: "automation qa" },
    { id: 4, title: "devops" },
  ],
};

app.get("/", (req: Request, res: Response) => {
  res.json(db.courses);
});

app.get("/courses", (req: Request, res: Response) => {
  let foundCoursesQuery = db.courses;
  console.log(req.query.title);
  if (req.query.title) {
    foundCoursesQuery = db.courses.filter(
      (c) => c.title.indexOf(req.query.title as string) >= 0
    );
  }

  res.json(foundCoursesQuery);
});

app.get("/courses/:id", (req: Request, res: Response) => {
  const foundCourse = db.courses.find((c) => c.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.json(foundCourse);
});

app.post("/courses", (req: Request, res: Response) => {
  // res.send("You have created samuray!");
  const createdCourse = { title: req.body.title, id: +new Date() };
  db.courses.push(createdCourse);
  res.status(HTTP_STATUSES.CREATED_201).send(createdCourse);
});

app.put("/courses/:id", (req: Request, res: Response) => {
  // res.send("You have created samuray!");
  // db.courses.push(createdCourse);
  const foundedCourse = db.courses.find((c) => c.id === +req.params.id);

  if (!foundedCourse) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  foundedCourse.title = req.body.title;
  res.send(foundedCourse);
});

app.delete("/courses/:id", (req: Request, res: Response) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);
  // res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  // console.log(req.params.id)
  res.send(db.courses);
});

app.post("/samurais", (req: Request, res: Response) => {
  res.send("You have created samuray!");
});

app.get("/samurais", (req: Request, res: Response) => {
  res.send("Hello Samurais!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
