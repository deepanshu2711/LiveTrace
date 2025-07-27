import express from "express";
import cors from "cors";
import { postUserLoacation } from "./api/postUserLocation.js";
import { getUserLocation } from "./api/getUserLocation.js";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.post("/api/user/location/:userId", postUserLoacation);
app.get("/api/user/location/:userId", getUserLocation);

app.listen(5090, () => {
  console.log("Server runnig on port 5090");
});
