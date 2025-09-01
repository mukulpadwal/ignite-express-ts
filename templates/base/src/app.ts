import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy...",
    data: null,
  });
});

export default app;
