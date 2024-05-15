const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/times/:timeId/jogadores/:jogadorId', async (req, res) => {
  const { timeId, jogadorId } = req.params;
  try {
    const jogadorTime = await prisma.jogadorTime.create({
      data: { timeId, jogadorId },
    });
    res.status(201).json(jogadorTime);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao associar jogador ao time' });
  }
});

router.get('/times/:timeId/jogadores', async (req, res) => {
  const { timeId } = req.params;
  try {
    const jogadores = await prisma.jogadorTime.findMany({
      where: { timeId },
      include: { jogador: true },
    });
    res.json(jogadores.map(jt => jt.jogador));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogadores do time' });
  }
});

router.get('/jogadores/:jogadorId/times', async (req, res) => {
  const { jogadorId } = req.params;
  try {
    const times = await prisma.jogadorTime.findMany({
      where: { jogadorId },
      include: { time: true },
    });
    res.json(times.map(jt => jt.time));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar times do jogador' });
  }
});

module.exports = router;
