import { validateNic } from '../lib';

describe('validateNic', () => {
  test('should return true for valid new NIC', () => {
    const nic = '191324107867';
    const result = validateNic(nic);
    expect(result).toBe(true);
  });

  test('should return true for valid old NIC', () => {
    const nic = '132417867V';
    const result = validateNic(nic);
    expect(result).toBe(true);
  });

  test('should return false for invalid NIC', () => {
    const nic = '13241786';
    const result = validateNic(nic);
    expect(result).toBe(false);
  });
});
