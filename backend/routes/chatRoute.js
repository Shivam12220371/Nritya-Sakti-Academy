const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Gracefully handle missing keys without throwing 500 errors to frontend
    if (!apiKey || apiKey === "PLACEHOLDER_KEY") {
      return res.status(200).json({ reply: "I am temporarily offline for maintenance. Please contact the academy directly at +91 6203053876 for assistance!" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using native systemInstruction for Gemini 1.5 instead of history hacks
    const systemPrompt = `You are a helpful and professional AI assistant for Nritya Shakti Academy. 
    Information you must use to answer questions:
    - Academy Name: Nritya Shakti Academy
    - Founder & Main Instructor: Ayushi Dubey
    - Location: Tower-B8, Flat no-1804A, Supertech Ecovillage 1, sector 1, Greater Noida, Uttar Pradesh, 201306, India
    - Contact Phone: +91 6203053876
    - Dance Styles: Bharatanatyam, Kathak, Bollywood, Fusion, Western Dance, Zumba, Free Style.
    - Offerings: Classes from absolute beginner to advanced levels.
    - Regular Operating Hours: Monday to Friday, 09:00 AM to 08:00 PM.
    - Website Creator/Developer: Er.Shivam Bhardwaj. (If anyone asks who made or built this website, answer exactly: "Er.Shivam Bhardwaj").

    Rules for your behavior:
    1. Only provide factual information listed above.
    2. If a user asks about fees, state that fee structures vary and they should call +91 6203053876 or visit the academy in person for exact details.
    3. Keep your answers concise, warm, and professional.
    4. Do not hallucinate or make up rules/policies.
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    const chat = model.startChat({});
    
    // Automatic Repair & Silent Retry Mechanism
    const MAX_RETRIES = 2;
    let attempt = 0;
    let text = "";

    while (attempt <= MAX_RETRIES) {
      try {
        const result = await chat.sendMessage(message);
        const response = await result.response;
        text = response.text();
        break; // Success! Break out of the loop
      } catch (err) {
        attempt++;
        if (attempt > MAX_RETRIES) {
          throw err; // Out of retries, throw to outer catch block for final fallback
        }
        console.error(`API hiccup detected. Automatically repairing: Attempt ${attempt}/${MAX_RETRIES}...`);
        // Fast 1-second pause to let the network/API recover
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error('Chat error:', error);
    // Never hit 500. Return 200 with an intuitive bot dialogue so the UI stays stable on deployment.
    return res.status(200).json({ reply: "I am experiencing high incoming traffic right now! For immediate assistance, please call us directly at +91 6203053876." });
  }
});

module.exports = router;
