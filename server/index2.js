"use strict";

const fs = require("fs");
const https = require("https");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");
  main();
});

function readLine() {
  return inputString[currentLine++];
}

const axios = require("axios");

function axiosTest() {
  return axios
    .get("https://jsonmock.hackerrank.com/api/stocks?date=5-January-2001")
    .then((res) => {
      console.log("hi", res.data);
      return res.data;
    })
    .catch((error) => error);
}

async function getResponse() {
  await axiosTest().then((res) => {
    return res;
  });
}
let res = getResponse();
console.log("helo", res);
async function getStockInformation(date) {
  // write your code here
  // API endpoint: https://jsonmock.hackerrank.com/api/stocks?date=<date>
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  //   ws.write("hi");
  let temp = {
    page: 1,
    per_page: 500,
    total: 1,
    total_pages: 1,
    data: [
      {
        date: "5-January-2001",
        open: 4116.34,
        high: 4195.01,
        low: 4115.35,
        close: 4183.73,
      },
    ],
  };
  await axios
    .get("https://jsonmock.hackerrank.com/api/stocks?date=" + date)
    .then((response) => {
      ws.write(JSON.parse(response).data[0].open);
      return JSON.parse(response).data[0];
    })
    .catch((err) => {
      ws.write(err);
    });
}

async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const date = readLine().trim();

  const result = await getStockInformation(date);
  const isEmpty = !Object.keys(result).length;
  if (isEmpty) {
    ws.write("No Results Found");
  } else {
    ws.write(`Open: ${result.open}\n`);
    ws.write(`High: ${result.high}\n`);
    ws.write(`Low: ${result.low}\n`);
    ws.write(`Close: ${result.close}\n`);
  }
}
