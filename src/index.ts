import { daysCount, nicPattern, suffixLetter } from './lib/constants';
import { NicGender, NicType } from './lib/types';
import { timezone } from './lib/constants';

const getYear = (nic: string): number =>
  parseInt(nic.length == 10 ? '19' + nic.slice(0, 2) : nic.slice(0, 4));

const getDays = (nic: string): number =>
  parseInt(nic.length == 10 ? nic.slice(2, 5) : nic.slice(4, 7));

const getGender = (days: number): NicGender => (days > 500 ? 'Female' : 'Male');

const getModifiedDays = (days: number): number =>
  days > 500 ? days - 500 : days;

const getDate = (modifiedDays: number): { month: number; day: number } => {
  for (let i = 12; i > 1; i--) {
    const conDays = daysCount[i - 1];

    if (modifiedDays > conDays) {
      return {
        month: i,
        day: modifiedDays - conDays,
      };
    }
  }
  return {
    month: 1,
    day: modifiedDays,
  };
};

export class Birthday {
  readonly year: number;
  readonly month: number;
  readonly date: number;

  constructor(year: number, month: number, date: number) {
    this.year = year;
    this.month = month;
    this.date = date;
  }

  toString(): string {
    return `${this.year}/${this.month}/${this.date}`;
  }

  toDate(): Date {
    return new Date(
      `${this.year}-${this.month.toString().padStart(2, '0')}-${this.date
        .toString()
        .padStart(2, '0')}T12:00:00${timezone}`,
    );
  }
}

export default class NIC {
  private readonly nic: string;

  constructor(nic: string) {
    if (typeof nic !== 'string') throw new TypeError('NIC must be a string');

    this.nic = nic;
  }

  get isValid(): boolean {
    if (!nicPattern.test(this.nic)) return false;

    const modifiedDays = getModifiedDays(getDays(this.nic));

    if (modifiedDays < 1 || modifiedDays > 366) return false;

    return true;
  }

  get type(): NicType {
    if (!this.isValid) throw new Error('Invalid NIC number');

    return this.nic.length == 10 ? 'OLD' : 'NEW';
  }

  get gender(): NicGender {
    if (!this.isValid) throw new Error('Invalid NIC number');

    return getGender(getDays(this.nic));
  }

  get birthday(): Birthday {
    if (!this.isValid) throw new Error('Invalid NIC number');

    const modifiedDays = getModifiedDays(getDays(this.nic));
    const { month, day } = getDate(modifiedDays);
    const year = getYear(this.nic);

    return new Birthday(year, month, day);
  }

  format(targetType: NicType = this.type): string {
    if (typeof targetType !== 'string' || !['OLD', 'NEW'].includes(targetType))
      throw new TypeError(
        'targetType must be a string and it must be either OLD or NEW',
      );

    if (targetType === this.type) return this.nic.toUpperCase();

    const year = getYear(this.nic);

    if (targetType == 'OLD' && (year >= 2000 || this.nic[7] !== '0'))
      throw new Error('Invalid request');

    const days = getDays(this.nic);
    const suffix =
      this.type == 'OLD'
        ? this.nic.slice(5, 9)
        : this.nic.slice(8) + suffixLetter;

    return targetType == 'OLD'
      ? `${year.toString().slice(2)}${days}${suffix}`
      : `${year}${days}0${suffix}`;
  }
}
