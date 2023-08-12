const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.port | 3000;

app.use(cors());
app.get("/getbigmacdata", (req, res) => {
  var requestOptions = {
    method: "GET",
  };
  const start_date = req.query.startdate;
  const end_date = req.query.enddate;
  if (!start_date || !end_date) {
    res.status(500).send();
    return;
  }
  fetch(
    `https://data.nasdaq.com/api/v3/datasets/ECONOMIST/BIGMAC_ROU?start_date=${start_date}&end_date=${end_date}&api_key=QzMi2D5iaZHFhb7KJsFx`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});
app.get("/getworldbankdata", (req, res) => {
  var requestOptions = {
    method: "GET",
  };
  const countries = req.query.countries;
  fetch(
    `https://data.nasdaq.com/api/v3/datatables/WB/DATA?series_id=VC.PKP.TOTL.UN&country_code=${countries}&api_key=QzMi2D5iaZHFhb7KJsFx`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
