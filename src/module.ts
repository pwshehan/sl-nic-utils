import { daysCount, nicPattern, suffixLetter } from './constants';
import { NicDetails, NicGender, NicType } from './types';

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
 * Validates a Sri Lankan National Identity Card (NIC) number.
 *
 * @param nic - The NIC number to validate.
 * @returns True if the NIC is valid, false otherwise.
 */
export const validateNic = (nic: string): boolean => {
  if (!nicPattern.test(nic)) return false;

  const modifiedDays = getModifiedDays(getDays(nic));

  if (modifiedDays < 1 || modifiedDays > 366) return false;

  return true;
};

/**
 * Determines the type of a NIC (National Identity Card) based on its format.
 * @param nic The NIC number to be evaluated.
 * @returns The type of the NIC ('OLD' or 'NEW').
 * @throws {Error} If the NIC number is invalid.
 */
export const getNicType = (nic: string): NicType => {
  if (!validateNic(nic)) throw new Error('Invalid NIC number');

  return nic.length == 10 ? 'OLD' : 'NEW';
};

/**
 * Formats the given NIC (National Identity Card) number based on the specified format type.
 * @param nic The NIC number to be formatted.
 * @param formatNicType The format type to be applied to the NIC number. Defaults to 'NEW'.
 * @returns The formatted NIC number.
 * @throws Error if an invalid request is made to convert a 'NEW' format NIC to an 'OLD' format NIC after the year 2000.
 */
export const formatNic = (
  nic: string,
  formatNicType: NicType = 'NEW',
): string => {
  const nicType = getNicType(nic);

  if (nicType == formatNicType) return nic;

  const year = getYear(nic);

  if (formatNicType == 'OLD' && year >= 2000)
    throw new Error('Invalid request');

  const days = getDays(nic);
  const suffix =
    nicType == 'OLD' ? nic.slice(5, 9) : nic.slice(8) + suffixLetter;

  return formatNicType == 'OLD'
    ? `${year.toString().slice(2)}${days}${suffix}`
    : `${year}${days}0${suffix}`;
};

/**
 * Retrieves the details of a NIC (National Identity Card) number.
 * @param nic - The NIC number to retrieve details for.
 * @returns The NIC details including type, gender, and birthday.
 * @throws {Error} If the NIC number is invalid.
 */
export const getNicDetails = (nic: string): NicDetails => {
  const nicType = getNicType(nic);

  const days = getDays(nic);

  const { month, day } = getDate(getModifiedDays(days));

  return {
    type: nicType,
    gender: getGender(days),
    birthday: new Date(getYear(nic), month - 1, day),
  };
};
