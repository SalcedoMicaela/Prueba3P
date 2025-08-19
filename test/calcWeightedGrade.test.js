const { calcularNotaPonderada, percentil } = require('../src/utils/calcWeightedGrade');

describe('calcularNotaPonderada', () => {
  it('calcula correctamente la nota ponderada', () => {
    const resultado = calcularNotaPonderada([
      { score: 80, weight: 0.4 },
      { score: 90, weight: 0.6 }
    ]);
    expect(resultado).toBe(86.00);
  });

  it('lanza error si los pesos no suman a 1', () => {
    expect(() => calcularNotaPonderada([
      { score: 80, weight: 0.5 },
      { score: 90, weight: 0.3 }
    ])).toThrow(RangeError);
  });

  it('lanza error si un score está fuera de rango', () => {
    expect(() => calcularNotaPonderada([
      { score: 120, weight: 0.5 },
      { score: 80, weight: 0.5 }
    ])).toThrow(RangeError);
  });

  it('lanza error si un weight está fuera de rango', () => {
    expect(() => calcularNotaPonderada([
      { score: 80, weight: -0.2 },
      { score: 90, weight: 1.2 }
    ])).toThrow(RangeError);
  });

  it('lanza error si items no es un arreglo válido', () => {
    expect(() => calcularNotaPonderada(null)).toThrow(TypeError);
    expect(() => calcularNotaPonderada([])).toThrow(TypeError);
  });
});

describe('percentil', () => {
  it('devuelve el mínimo cuando p=0', () => {
    expect(percentil(0, [1, 2, 3])).toBe(1.00);
  });

  it('devuelve el máximo cuando p=100', () => {
    expect(percentil(100, [1, 2, 3])).toBe(3.00);
  });

  it('calcula correctamente el percentil con método nearest-rank', () => {
    expect(percentil(50, [1, 2, 3, 4])).toBe(2.00);
  });

  it('lanza error si p está fuera de rango', () => {
    expect(() => percentil(-10, [1, 2, 3])).toThrow(RangeError);
    expect(() => percentil(120, [1, 2, 3])).toThrow(RangeError);
  });

  it('lanza error si valores no es un arreglo válido', () => {
    expect(() => percentil(50, null)).toThrow(TypeError);
    expect(() => percentil(50, [])).toThrow(TypeError);
  });

  it('lanza error si valores contiene elementos no numéricos', () => {
    expect(() => percentil(50, [1, 'a', 3])).toThrow(TypeError);
  });
});
