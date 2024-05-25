import express, {Application} from "express";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(express.json());

app.get("/products", logics.readProducts);

app.post("/products", middlewares.verifyNameCreate ,logics.createProducts);

app.get("/products/:productId", middlewares.verifyId, logics.retrieveProduct);

app.patch("/products/:productId", middlewares.verifyId, middlewares.verifyNameUpdate, logics.updateProducts);

app.delete("/products/:productId", middlewares.verifyId, logics.deleteProduct);

const PORT: number = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
