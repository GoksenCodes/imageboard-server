const express = require("express");

//Import the ./router/image as imageRouter and ./router/user as userRouter.
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");

const PORT = process.env.PORT || 4000;
const app = express();

//middlewares
const jsonParser = express.json(); //jsonParser: parser middleware
app.use(jsonParser);

app.use(express.json()); //bodyparser middleware

app.listen(PORT, () => console.log(`listening on: ${PORT}`));

//Register them both to their corresponing root path (/images and /users).
app.use("/users", userRouter);
app.use("/images", imageRouter);
