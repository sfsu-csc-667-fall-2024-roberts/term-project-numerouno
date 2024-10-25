import httpErrors from "http-errors";
import express from "express";
import { timeMiddleware } from "./middleware/time";
import rootRoutes from "./routes/root";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(timeMiddleware);
app.use("/", rootRoutes);
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
app.use((_request, _response, next) => {
    next(httpErrors(404));
    });