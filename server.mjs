import dotenv from "dotenv";
import express from "express";

import router from "./src/routes/index.mjs";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.set("trust proxy", "loopback");
app.use(express.json());
app.use(express.static("./public"));
app.use("/", router);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: "Something Went Wrong" });
});

app.listen(port, () => console.log(`Listening on ${port}`));

process.on("uncaughtException", function (err) {
  console.log("error", err);
});
