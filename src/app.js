const express = require('express');
const {
  toCelsius,
  toFahrenheit,
  movingAverage,
} = require('./utils/conversions');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Clima & Conversión');
});

app.get('/toCelsius/:f', (req, res) => {
  const f = Number(req.params.f);
  res.json({ f, c: toCelsius(f) });
});

app.get('/toFahrenheit/:c', (req, res) => {
  const c = Number(req.params.c);
  res.json({ c, f: toFahrenheit(c) });
});

app.post('/movingAverage', (req, res) => {
  const { series, window } = req.body;
  res.json({ result: movingAverage(series, window) });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () =>
    console.log('Servidor corriendo en http://localhost:' + PORT)
  );
}

module.exports = app;
