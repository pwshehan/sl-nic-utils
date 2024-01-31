import { formatNic } from '../lib';

describe('formatNic', () => {
  test('should return new NIC for valid old NIC', () => {
    const nic = '132417867V';
    const result = formatNic(nic);
    expect(result).toBe("191324107867");
  });

  test('should return old NIC for valid new NIC', () => {
    const nic = '191324107867';
    const result = formatNic(nic, 'OLD');
    expect(result).toBe("132417867V");
  });
});
