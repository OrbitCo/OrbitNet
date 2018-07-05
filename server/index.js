require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initMongoose = require('./factories/mongoose');
const Loan = require('./models/loan');

const app = express();

async function runApp() {
  await initMongoose();

  app.use(cors({
    origin: process.env.FRONT_HOST,
    credentials: true,
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  /*
   * Creates new Loan record in MongoDB
   */
  app.post('/api/loans', async (req, res) => {
    const { issuanceHash, networkId } = req.body;

    // Just skip duplicated loans
    if ((await Loan.count({ issuanceHash, networkId })) > 0) {
      return res.end();
    }

    const loan = new Loan({ issuanceHash, networkId });

    const savedLoan = await loan.save();

    res.json(savedLoan);
  });

  app.listen(process.env.SERVER_PORT, function () {
    console.error(`Listening on port ${process.env.SERVER_PORT}`);
  });
}

runApp();
