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
  console.log("------ validation data ------");
  console.log(data);
  console.log("------ validation data ------");
});

app.post("/sandbox/confirmation", (request, response) => {
  const data = request.body;
//   const testData = {
//     TransactionType: "Pay Bill",
//     TransID: "PJU6X5M4TI",
//     TransTime: "20211030092827",
//     TransAmount: "600.00",
//     BusinessShortCode: "4067985",
//     BillRefNumber: "WEAVER",
//     InvoiceNumber: "",
//     OrgAccountBalance: "378275.00",
//     ThirdPartyTransID: "",
//     MSISDN: "254721383580",
//     FirstName: "WYCLIFF",
//     MiddleName: "ONSONGO",
//     LastName: "OCHARO",
//   };


  producer.send({topic: 'payment-confirmation', messages: [
      {
        value: JSON.stringify(data)
      }
  ]});

  response.send(data);
//
//   console.log("------ confirmation data ------");
//   console.log(data);
//   console.log("------ confirmation data ------");
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
