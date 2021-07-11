import Member from '../models/members';

export const countMembers = async () => {
  const count = await Member.countDocuments();
  return count;
};
