import express from 'express';
import axios from 'axios';
const router = express.Router();

router.post('/recommend', async (req, res) => {
  const { goals, interests } = req.body;
  const apiKey = process.env.COHERE_API_KEY;

  const prompt = `Suggest AI or programming courses for someone whose goals are: "${goals}" and interests are: "${interests}".`;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/generate',
      {
        model: 'command',
        prompt,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response?.data?.text?.trim();
    if (!aiResponse) {
      return res.status(500).json({ error: 'No response text from AI' });
    }

    res.json({ courses: aiResponse });

  } catch (err) {
    console.error('AI Suggestion Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'AI generation failed' });
  }
});

export default router;
