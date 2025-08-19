
const {
  toCelsius,
  toFahrenheit,
  movingAverage,
} = require('../src/utils/sum');

describe('Conversión de temperaturas', () => {
  test('32°F -> 0.0°C', () => {
    expect(toCelsius(32)).toBe(0.0);
  });

  test('0°C -> 32.0°F', () => {
    expect(toFahrenheit(0)).toBe(32.0);
  });

  test('100°C -> 212.0°F', () => {
    expect(toFahrenheit(100)).toBe(212.0);
  });

  test('-40°C -> -40.0°F', () => {
    expect(toFahrenheit(-40)).toBe(-40.0);
    expect(toCelsius(-40)).toBe(-40.0);
  });

  test('error si no es número', () => {
    expect(() => toCelsius('hola')).toThrow(TypeError);
    expect(() => toFahrenheit(NaN)).toThrow(TypeError);
  });
});

describe('Media móvil', () => {
  test('[10,20,30,40] con w=2 -> [15.00,25.00,35.00]', () => {
    expect(movingAverage([10, 20, 30, 40], 2)).toEqual([15.0, 25.0, 35.0]);
  });

  test('[1,2,3] con w=3 -> [2.00]', () => {
    expect(movingAverage([1, 2, 3], 3)).toEqual([2.0]);
  });

  test('error si valores no son números', () => {
    expect(() => movingAverage([1, 'x', 3], 2)).toThrow(TypeError);
  });

  test('error si ventana fuera de rango', () => {
    expect(() => movingAverage([1, 2], 5)).toThrow(RangeError);
  });
});
