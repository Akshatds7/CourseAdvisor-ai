// testCohere.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const test = async () => {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/generate",
      {
        model: "command",
        prompt: "Suggest courses to learn full-stack development",
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

test();
