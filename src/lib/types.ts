export type NicType = 'OLD' | 'NEW';

export type NicGender = 'Male' | 'Female';

export type NicDetails = {
  type: NicType;
  gender: NicGender;
  birthday: Date;
};
