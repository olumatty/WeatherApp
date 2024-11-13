import axios from "axios";

export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = "52c645a604bba508631dfa1baf3746aa";
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: "Failed to fetch data" });
  }
}