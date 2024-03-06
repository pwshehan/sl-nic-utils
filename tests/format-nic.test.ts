import NIC from '../src/';

describe('formatNic', () => {
  test('should return new NIC for valid old NIC', () => {
    const nic = new NIC('132417867V');
    expect(nic.format('NEW')).toBe("191324107867");
  });

  test('should return old NIC for valid new NIC', () => {
    const nic = new NIC('191324107867');
    expect(nic.format('OLD')).toBe("132417867V");
  });
});
