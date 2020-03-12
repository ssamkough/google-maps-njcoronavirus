import express from "express";
import path from "path";
import neatCsv from "neat-csv";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

router.get("/csv", (req, res) => {
  const filePath = path.join(__dirname + "/public/assets/data.csv");
  let csvObj;

  fs.readFile(filePath, async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    csvObj = await neatCsv(data);
  });

  res.json(csvObj);
});

export default router;
