const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); 
app.use(express.json()); // Permite JSON no body

const PORT = 3000;

// Simulação de banco de dados
let users = [];

// Rota inicial
app.get("/", (req, res) => {
  res.send("API CRUD de Usuários rodando com sucesso!");
});

// Criar usuário (POST)
app.post("/users", (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios" });
  }
  const novo = { id: users.length + 1, nome, email };
  users.push(novo);
  res.status(201).json(novo);
});

// Listar todos usuários (GET)
app.get("/users", (req, res) => {
  res.json(users);
});

// Buscar usuário por ID (GET)
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  res.json(user);
});

// Atualizar usuário por ID (PUT)
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  const { nome, email } = req.body;
  if (nome) user.nome = nome;
  if (email) user.email = email;
  res.json(user);
});

// Deletar usuário por ID (DELETE)
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  const removido = users.splice(index, 1);
  res.json({ msg: "Usuário removido", removido });
});

// Start
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
