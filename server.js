const express = require('express');
const bodyParser = require('body-parser');
const jogadoresRouter = require('./routes/jogadores');
const timesRouter = require('./routes/times');
const partidasRouter = require('./routes/partidas');
const relacoesRouter = require('./routes/relacoes');

const app = express();
app.use(bodyParser.json());

app.use('/jogadores', jogadoresRouter);
app.use('/times', timesRouter);
app.use('/partidas', partidasRouter);
app.use('/relacoes', relacoesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
