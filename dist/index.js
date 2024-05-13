"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
const jsonBodyMiddleware = express_1.default.json();
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
app.get("/", (req, res) => {
    res.json(db.courses);
});
app.get("/courses", (req, res) => {
    let foundCoursesQuery = db.courses;
    console.log(req.query.title);
    if (req.query.title) {
        foundCoursesQuery = db.courses.filter((c) => c.title.indexOf(req.query.title) >= 0);
    }
    res.json(foundCoursesQuery);
});
app.get("/courses/:id", (req, res) => {
    const foundCourse = db.courses.find((c) => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(foundCourse);
});
app.post("/courses", (req, res) => {
    // res.send("You have created samuray!");
    const createdCourse = { title: req.body.title, id: +new Date() };
    db.courses.push(createdCourse);
    res.status(HTTP_STATUSES.CREATED_201).send(createdCourse);
});
app.put("/courses/:id", (req, res) => {
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
app.delete("/courses/:id", (req, res) => {
    db.courses = db.courses.filter((c) => c.id !== +req.params.id);
    // res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    // console.log(req.params.id)
    res.send(db.courses);
});
app.post("/samurais", (req, res) => {
    res.send("You have created samuray!");
});
app.get("/samurais", (req, res) => {
    res.send("Hello Samurais!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
