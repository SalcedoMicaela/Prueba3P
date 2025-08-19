function calcularNotaPonderada(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new TypeError('items debe ser un arreglo no vacío');
  }
  let pesoTotal = 0;
  let sumaPonderada = 0;
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
    pesoTotal += item.weight;
    sumaPonderada += item.score * item.weight;
  }
  if (Math.abs(pesoTotal - 1) > 0.001) {
    throw new RangeError('La suma de los pesos debe ser 1 ±0.001');
  }
  return Number(sumaPonderada.toFixed(2));
}

function percentil(p, valores) {
  if (typeof p !== 'number' || !Number.isFinite(p)) {
    throw new TypeError('p debe ser un número finito');
  }
  if (p < 0 || p > 100) {
    throw new RangeError('p fuera de rango [0,100]');
  }
  if (!Array.isArray(valores) || valores.length === 0) {
    throw new TypeError('valores debe ser un arreglo no vacío');
  }
  if (valores.some(v => typeof v !== 'number' || !Number.isFinite(v))) {
    throw new TypeError('valores debe contener solo números finitos');
  }

  const ordenados = [...valores].sort((a, b) => a - b);
  const n = ordenados.length;

  if (p === 0) return Number(ordenados[0].toFixed(2));
  if (p === 100) return Number(ordenados[n - 1].toFixed(2));

  const rango = Math.ceil((p / 100) * n); 
  return Number(ordenados[rango - 1].toFixed(2));
}

module.exports = { calcularNotaPonderada, percentil };
