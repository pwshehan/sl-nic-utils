import { getNicDetails } from '../lib';

describe('getNicDetails', () => {
  test('should return NIC Details for valid new NIC', () => {
    const nic = '191324107867';
    const result = getNicDetails(nic);
    expect(result).toEqual({
      type: 'NEW',
      gender: 'Male',
      birthday: new Date(1913, 7, 28)
    });
  });

  test('should return NIC Details for valid old NIC', () => {
    const nic = '132417867V';
    const result = getNicDetails(nic);
    expect(result).toEqual({
      type: 'OLD',
      gender: 'Male',
      birthday: new Date(1913, 7, 28)
    });
  });
});
