import e from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";

const app = e();
const port = process.env.PORT;

app.use(e.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}`);
});
