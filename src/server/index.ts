import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import * as path from "path";
import connectLiveReload from "connect-livereload";
import livereload from "livereload"


import { timeMiddleware } from "./middleware/time";

import rootRoutes from "./routes/root";
import { configureLiveReload } from "./config";
import { stat } from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "src",
    "public")));
app.use(cookieParser());

app.use(timeMiddleware);
app.use(
    express.static(path.join(process.cwd(), "src", "public"))
);
app.set(
    "views",
    path.join(process.cwd(), "src", "server", "views")
);
app.set("view engine", "ejs");
app.use("/", rootRoutes);
app.use((_request, _response, next) => {
    next(httpErrors(404));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));

configureLiveReload(app, staticPath);
