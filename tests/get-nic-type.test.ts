import NIC from '../src/';

describe('getNicType', () => {
  test('should return NEW for valid new NIC', () => {
    const nic = new NIC('191324107867');
    expect(nic.type).toBe('NEW');
  });

  test('should return OLD for valid old NIC', () => {
    const nic = new NIC('132417867V');
    expect(nic.type).toBe('OLD');
  });
});
