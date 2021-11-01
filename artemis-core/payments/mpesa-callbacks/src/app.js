import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { kafkaClient } from "../../../messaging/index.js";

// initialize dotnev
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Messaging Queues;
const producer = kafkaClient.producer();

app.get("/", async (request, response) => {
  response.send({ ping: "ping pong" });
});

app.post("/sandbox/validation", (request, response) => {
  const data = request.body;
  
  response.send({message: 'validating payment...'})
});

app.post("/sandbox/confirmation", (request, response) => {
  const data = request.body;

  producer.send({topic: 'payment-confirmations', messages: [
      {
        value: JSON.stringify(data)
      }
  ]});

  response.send({message: 'payment confirmed'});
});

const port = process.env.PORT || 3000;

async function init() {
  await producer.connect();
  app.listen(port, () => {
    console.log(
      `> mpesa callbacks server. Check it out on http://localhost:${port}`
    );
  });
}

// Start the app service
init();
