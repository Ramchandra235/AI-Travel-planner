const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateItinerary = async (
  destination,
  durationDays,
  budgetTier,
  interests
) => {
  console.log("Groq function called");

  const prompt = `
Create a travel itinerary.

Destination: ${destination}
Duration: ${durationDays} days
Budget: ${budgetTier}
Interests: ${interests.join(", ")}

Create a day-by-day itinerary.
`;

  console.log("Calling Groq...");

  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

  console.log("Groq responded");

  return completion.choices[0].message.content;
};

module.exports = {
  generateItinerary,
};