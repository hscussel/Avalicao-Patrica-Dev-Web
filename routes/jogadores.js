const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, idade, posicao, nacionalidade } = req.body;
  try {
    const jogador = await prisma.jogador.create({
      data: { nome, idade, posicao, nacionalidade },
    });
    res.status(201).json(jogador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar jogador' });
  }
});

router.get('/', async (req, res) => {
  try {
    const jogadores = await prisma.jogador.findMany();
    res.json(jogadores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogadores' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jogador = await prisma.jogador.findUnique({ where: { id } });
    if (!jogador) return res.status(404).json({ error: 'Jogador não encontrado' });
    res.json(jogador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogador' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, idade, posicao, nacionalidade } = req.body;
  try {
    const jogador = await prisma.jogador.update({
      where: { id },
      data: { nome, idade, posicao, nacionalidade },
    });
    res.json(jogador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar jogador' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.jogador.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar jogador' });
  }
});

module.exports = router;
