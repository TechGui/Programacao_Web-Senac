import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const router = Router();
const prisma = new PrismaClient();

// Rota para listar todos os jogos
router.get('/', async (req, res) => {
  try {
    const jogos = await prisma.jogo.findMany();
    res.json(jogos);
  } catch (error) {
    console.error('Erro ao listar jogos:', error);
    res.status(500).json({ error: 'Erro ao listar jogos' });
  }
});

// Rota para criar um novo jogo
router.post('/', async (req, res) => {
  const { nome, desenvolvedora, genero, dataLancamento, urlImagem } = req.body;
  try {
    const novoJogo = await prisma.jogo.create({
      data: { nome, desenvolvedora, genero, dataLancamento, urlImagem },
    });
    res.status(201).json(novoJogo);
  } catch (error) {
    console.error('Erro ao criar jogo:', error);
    res.status(500).json({ error: 'Erro ao criar jogo' });
  }
});

// Rota para ver emails de quem votou em um jogo
router.get('/:id/emails', async (req, res) => {
  const { id } = req.params;
  try {
    const jogo = await prisma.jogo.findUnique({ where: { id: Number(id) } });
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }
    res.json(jogo.emails);
  } catch (error) {
    console.error('Erro ao listar emails:', error);
    res.status(500).json({ error: 'Erro ao listar emails' });
  }
});

// Rota para apagar um jogo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jogo = await prisma.jogo.findUnique({ where: { id: Number(id) } });
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }
    await prisma.jogo.delete({ where: { id: Number(id) } });
    res.json(jogo);
  } catch (error) {
    console.error('Erro ao apagar jogo:', error);
    res.status(500).json({ error: 'Erro ao apagar jogo' });
  }
});

// Rota para votar em um jogo
router.put('/:id/vote', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const jogo = await prisma.jogo.findUnique({ where: { id: Number(id) } });
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }
    if (jogo.emails.includes(email)) {
      return res.status(400).json({ error: 'Email já votou nesse jogo' });
    }

    const updatedGame = await prisma.jogo.update({
      where: { id: Number(id) },
      data: {
        votos: jogo.votos + 1,
        emails: { push: email },
      },
    });
    res.json(updatedGame);
  } catch (error) {
    console.error('Erro ao votar no jogo:', error);
    res.status(500).json({ error: 'Erro ao votar no jogo' });
  }
});

// Rota para ordenar jogos por votos
router.get('/ordenar/votos', async (req, res) => {
  try {
    const jogos = await prisma.jogo.findMany({ orderBy: { votos: 'desc' } });
    res.json(jogos);
  } catch (error) {
    console.error('Erro ao listar jogos:', error);
    res.status(500).json({ error: 'Erro ao listar jogos' });
  }
});

export default router;
