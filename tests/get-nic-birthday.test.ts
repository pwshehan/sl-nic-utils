import NIC from '../src/';

describe('getNicBirthday', () => {
  test('should return birthday for valid new NIC', () => {
    const nic = new NIC('191324107867');
    expect({
      year: nic.birthday.year,
      month: nic.birthday.month,
      date: nic.birthday.date,
    }).toEqual({ year: 1913, month: 8, date: 28 });
  });
});
