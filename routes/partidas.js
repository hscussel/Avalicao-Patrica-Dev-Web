const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/', async (req, res) => {
  const { data, local, placar, timeDaCasaId, timeVisitanteId } = req.body;
  try {
    const partida = await prisma.partida.create({
      data: { data, local, placar, timeDaCasaId, timeVisitanteId },
    });
    res.status(201).json(partida);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar partida' });
  }
});

router.get('/', async (req, res) => {
  try {
    const partidas = await prisma.partida.findMany();
    res.json(partidas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar partidas' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const partida = await prisma.partida.findUnique({ where: { id } });
    if (!partida) return res.status(404).json({ error: 'Partida não encontrada' });
    res.json(partida);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar partida' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, local, placar, timeDaCasaId, timeVisitanteId } = req.body;
  try {
    const partida = await prisma.partida.update({
      where: { id },
      data: { data, local, placar, timeDaCasaId, timeVisitanteId },
    });
    res.json(partida);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar partida' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.partida.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar partida' });
  }
});

module.exports = router;
