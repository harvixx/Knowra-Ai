import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "llama-3.1-8b-instant",
  apiKey: process.env.GROQ_API_KEY,
  configuration: {
    baseURL: "https://api.groq.com/openai/v1"
  }
});

export async function run() {
  const res = await model.invoke("kya tumhe mere bare me pata hai?");
  console.log(res.content);
}
