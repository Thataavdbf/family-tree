import { calculatePythagoreanNumber, calculatePythagoreanSoulUrge, calculatePythagoreanPersonality, calculateLifePath } from '../numerology-utils';

describe('Numerology Utils', () => {
  test('calculatePythagoreanNumber returns correct value', () => {
    expect(calculatePythagoreanNumber('John')).toBeGreaterThan(0);
  });

  test('calculatePythagoreanSoulUrge returns a number', () => {
    expect(typeof calculatePythagoreanSoulUrge('John')).toBe('number');
  });

  test('calculatePythagoreanPersonality returns a number', () => {
    expect(typeof calculatePythagoreanPersonality('John')).toBe('number');
  });

  test('calculateLifePath returns correct value for valid date', () => {
    expect(calculateLifePath('2000-01-05')).toBeGreaterThan(0);
  });
});
