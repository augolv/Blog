import e from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = e();
const port = process.env.PORT;

app.use(e.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}`);
});
