require("dotenv").config();
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import router from "./router";

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

const onAppStarted = () => {
  console.log(`App running on ${port}.`);
};

const port = parseInt(process.env.PORT) || 8000;
app.listen(port, onAppStarted);

// import { Client } from "@googlemaps/google-maps-services-js";

// const client = new Client({});

// const testClient = async () => {
//   try {
//     const r = await client.elevation(
//       {
//         params: {
//           locations: [{ lat: 45, lng: -110 }],
//           key: process.env.GOOGLE_MAPS_API_KEY
//         },
//         timeout: 1000
//       },
//       client.axiosInstance
//     );
//     console.log(r.data.results[0].elevation);
//   } catch (e) {
//     console.log(e);
//   }
// };

// testClient();
