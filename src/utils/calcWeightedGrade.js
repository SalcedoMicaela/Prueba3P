function calcWeightedGrade(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new TypeError('items debe ser un arreglo no vacío');
  }

  let totalWeight = 0;
  let weightedSum = 0;

  for (const item of items) {
    if (typeof item.score !== 'number' || !Number.isFinite(item.score)) {
      throw new TypeError('score debe ser un número finito');
    }
    if (typeof item.weight !== 'number' || !Number.isFinite(item.weight)) {
      throw new TypeError('weight debe ser un número finito');
    }
    if (item.score < 0 || item.score > 100) {
      throw new RangeError('score fuera de rango [0,100]');
    }
    if (item.weight < 0 || item.weight > 1) {
      throw new RangeError('weight fuera de rango [0,1]');
    }

    totalWeight += item.weight;
    weightedSum += item.score * item.weight;
  }

  // Tolerancia ±0.001
  if (Math.abs(totalWeight - 1) > 0.001) {
    throw new RangeError('La suma de los pesos debe ser 1 ±0.001');
  }

  return Number(weightedSum.toFixed(2));
}

function percentile(p, values) {
  if (typeof p !== 'number'|| !Number.isFinite(p)) {
    throw new TypeError('p debe ser un número finito');
  }
  if (p < 0 || p > 100) {
    throw new RangeError('p fuera de rango [0,100]');
  }
  if (!Array.isArray(values) || values.length === 0) {
    throw new TypeError('values debe ser un arreglo no vacío');
  }
  if (values.some(v => typeof v !== 'number' || !Number.isFinite(v))) {
    throw new TypeError('values debe contener solo números finitos');
  }

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  if (p === 0) return Number(sorted[0].toFixed(2));
  if (p === 100) return Number(sorted[n - 1].toFixed(2));

  const rank = Math.ceil((p / 100) * n); // nearest-rank
  return Number(sorted[rank - 1].toFixed(2));
}

module.exports = { calcWeightedGrade, percentile };
