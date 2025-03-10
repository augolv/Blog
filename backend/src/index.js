import e from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";

const app = e();
const port = process.env.PORT;

app.use(e.json());

const validateJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ error: "Invalid or exprired token" });
    }

    req.user = decoded;
    next();
  });
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}`);
});
