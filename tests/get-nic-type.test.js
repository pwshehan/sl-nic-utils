import { getNicType } from '../lib';

describe('getNicType', () => {
  test('should return NEW for valid new NIC', () => {
    const nic = '191324107867';
    const result = getNicType(nic);
    expect(result).toBe("NEW");
  });

  test('should return OLD for valid old NIC', () => {
    const nic = '132417867V';
    const result = getNicType(nic);
    expect(result).toBe("OLD");
  });
});
