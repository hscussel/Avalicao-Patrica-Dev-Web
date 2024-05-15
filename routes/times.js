const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, ano_de_fundacao, pais, tecnico } = req.body;
  try {
    const time = await prisma.time.create({
      data: { nome, ano_de_fundacao, pais, tecnico },
    });
    res.status(201).json(time);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar time' });
  }
});

router.get('/', async (req, res) => {
  try {
    const times = await prisma.time.findMany();
    res.json(times);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar times' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const time = await prisma.time.findUnique({ where: { id } });
    if (!time) return res.status(404).json({ error: 'Time não encontrado' });
    res.json(time);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar time' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, ano_de_fundacao, pais, tecnico } = req.body;
  try {
    const time = await prisma.time.update({
      where: { id },
      data: { nome, ano_de_fundacao, pais, tecnico },
    });
    res.json(time);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar time' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.time.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar time' });
  }
});

module.exports = router;
