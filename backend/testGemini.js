require("dotenv").config();

const {
  generateItinerary,
} = require("./services/geminiService");

async function test() {
  const result =
    await generateItinerary(
      "Tokyo",
      5,
      "Medium",
      ["Food", "Culture"]
    );

  console.log(result);
}

test();