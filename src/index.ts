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

/**
 * Represents a birthday with year, month, and date.
 */
export class Birthday {
  readonly year: number;
  readonly month: number;
  readonly date: number;

  /**
   * Creates a new instance of the Birthday class.
   * @param year - The year of the birthday.
   * @param month - The month of the birthday.
   * @param date - The date of the birthday.
   */
  constructor(year: number, month: number, date: number) {
    this.year = year;
    this.month = month;
    this.date = date;
  }

  /**
   * Returns a string representation of the birthday in the format "YYYY/MM/DD".
   * @returns The string representation of the birthday.
   */
  toString(): string {
    return `${this.year}/${this.month}/${this.date}`;
  }

  /**
   * Returns a Date object representing the birthday.
   * @returns The Date object representing the birthday.
   */
  toDate(): Date {
    return new Date(
      `${this.year}-${this.month.toString().padStart(2, '0')}-${this.date
        .toString()
        .padStart(2, '0')}T12:00:00${timezone}`,
    );
  }
}

/**
 * Represents a NIC (National Identity Card) number.
 */
export default class NIC {
  private readonly nic: string;

  /**
   * Creates a new instance of the NIC class.
   * @param nic - The NIC number as a string.
   * @throws {TypeError} If the provided NIC is not a string.
   */
  constructor(nic: string) {
    if (typeof nic !== 'string') throw new TypeError('NIC must be a string');

    this.nic = nic;
  }

  /**
   * Checks if the NIC number is valid.
   * @returns {boolean} True if the NIC number is valid, false otherwise.
   */
  get isValid(): boolean {
    if (!nicPattern.test(this.nic)) return false;

    const modifiedDays = getModifiedDays(getDays(this.nic));

    return !(modifiedDays < 1 || modifiedDays > 366);
  }

  /**
   * Gets the type of the NIC number.
   * @returns {NicType} The type of the NIC number.
   * @throws {Error} If the NIC number is invalid.
   */
  get type(): NicType {
    if (!this.isValid) throw new Error('Invalid NIC number');

    return this.nic.length == 10 ? 'OLD' : 'NEW';
  }

  /**
   * Gets the gender associated with the NIC number.
   * @returns {NicGender} The gender associated with the NIC number.
   * @throws {Error} If the NIC number is invalid.
   */
  get gender(): NicGender {
    if (!this.isValid) throw new Error('Invalid NIC number');

    return getGender(getDays(this.nic));
  }

  /**
   * Gets the birthday associated with the NIC number.
   * @returns {Birthday} The birthday associated with the NIC number.
   * @throws {Error} If the NIC number is invalid.
   */
  get birthday(): Birthday {
    if (!this.isValid) throw new Error('Invalid NIC number');

    const modifiedDays = getModifiedDays(getDays(this.nic));
    const { month, day } = getDate(modifiedDays);
    const year = getYear(this.nic);

    return new Birthday(year, month, day);
  }

  /**
   * Formats the NIC number to the specified target type.
   * @param targetType - The target type to format the NIC number to. Defaults to the current type.
   * @returns {string} The formatted NIC number.
   * @throws {TypeError} If the targetType is not a string or is not 'OLD' or 'NEW'.
   * @throws {Error} If the targetType is 'OLD' and the NIC number is not valid for an old NIC.
   */
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
