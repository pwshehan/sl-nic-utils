import NIC from '../src/';

describe('validateNic', () => {
  test('should return true for valid new NIC', () => {
    const nic = new NIC('191324107867');
    expect(nic.isValid).toBe(true);
  });

  test('should return true for valid old NIC', () => {
    const nic = new NIC('132417867V');
    expect(nic.isValid).toBe(true);
  });

  test('should return false for invalid NIC', () => {
    const nic = new NIC('13241786');
    expect(nic.isValid).toBe(false);
  });
});
