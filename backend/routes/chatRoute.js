const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "PLACEHOLDER_KEY") {
      return res.status(503).json({ error: "The AI chat feature is temporarily disabled because the API key is not configured." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `You are a helpful and professional AI assistant for Nritya Shakti Academy. 
    Information you must use to answer questions:
    - Academy Name: Nritya Shakti Academy
    - Founder & Main Instructor: Ayushi Dubey
    - Location: Tower-B8, Flat no-1804A, Supertech Ecovillage 1, sector 1, Greater Noida, Uttar Pradesh, 201306, India
    - Contact Phone: 6203053876
    - Dance Styles: Bharatanatyam, Kathak, Odissi, Bollywood, Fusion, and Classical Dance.
    - Offerings: Classes from absolute beginner to advanced levels.
    - Regular Operating Hours: Monday to Saturday, 09:00 AM to 08:00 PM.

    Rules for your behavior:
    1. Only provide factual information listed above.
    2. If a user asks about fees, state that fee structures vary and they should call 6203053876 or visit the academy in person for exact details.
    3. Keep your answers concise, warm, and professional.
    4. Do not hallucinates or make up rules/policies.
    `;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will act as the AI assistant for Nritya Shakti Academy and follow these instructions strictly." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message. Please try again later.' });
  }
});

module.exports = router;
