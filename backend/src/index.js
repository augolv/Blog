import e from "express";
import "dotenv/config";

const app = e();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}`);
});
