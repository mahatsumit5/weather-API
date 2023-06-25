import axios from "axios";
import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8000;

// middleware to convert data into json
app.use(express.json());
// cross  origin resources sharing connects two network hosted at different place
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    msg: "welcome to my weather api ",
  });
});
app.post("/results", async (req, res) => {
  const { city } = req.body; //getting name of city from the body
  console.log(city);
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    params: { q: `${city}`, days: "3" },
    headers: {
      "X-RapidAPI-Key": "248de94f44mshef0e6efb0ba66fbp1abdafjsn2422e43de92f",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    res.send({
      status: "success",
      message: "success",
      data: response.data,
    });
    console.log(response);
  } catch (error) {
    // this if statement solves the error fo cannot set headers after they are sent to the client
    if (!error) {
      res.json({
        status: "error",
        message: "error",
      });
    }
  }
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server running at http://localhost:${PORT}`);
});
