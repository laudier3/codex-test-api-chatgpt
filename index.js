require("dotenv").config();
const OpenAI = require("openai");
const readline = require("readline");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Interface para ler o terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Histórico da conversa
const messages = [
  {
    role: "system",
    content: "Você é um assistente útil e responde de forma clara."
  }
];

console.log("🤖 Chat iniciado! Digite sua pergunta (ou 'sair' para encerrar)\n");

function perguntar() {
  rl.question("Você: ", async (pergunta) => {
    if (pergunta.toLowerCase() === "sair") {
      console.log("👋 Até mais!");
      rl.close();
      return;
    }

    messages.push({ role: "user", content: pergunta });

    try {
      const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: messages,
      });

      const resposta = response.output_text;

      console.log("\nIA:", resposta, "\n");

      messages.push({ role: "assistant", content: resposta });

    } catch (err) {
      console.error("❌ Erro:", err.message);
    }

    perguntar();
  });
}

perguntar();
