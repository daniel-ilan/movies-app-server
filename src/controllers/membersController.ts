import { Response, Request } from 'express';
import Member from '../models/memberModel';

export const countMembers = async () => {
  const count = await Member.countDocuments();
  return count;
};

export const getAllMembers = async (_req: Request, res: Response) => {
  try {
    const allMembers = await Member.find({}).sort([['updatedAt', -1]]);

    return res.status(200).json(allMembers);
  } catch (error) {
    throw error;
  }
};

export const addNewMember = async (req: Request, res: Response) => {
  const { email, name, city } = req.body;

  const memberExists = await Member.find({ email });
  console.log('memberExists', memberExists);

  if (memberExists.length > 0) {
    return res
      .status(200)
      .json({ message: 'Member with this email already exists' });
  }
  const newMember = new Member({
    email,
    name,
    city,
  });
  await newMember.save();

  return res.status(200).json({ message: `Member ${name} saved successfully` });
};

export const editMember = async (req: Request, res: Response) => {
  console.log('req.body', req.body);

  const { email, name, city, _id } = req.body;

  const membersFound = await Member.find({ email });
  if (membersFound.length > 0) {
    console.log(membersFound);

    for (const member of membersFound) {
      if (member._id.toString() !== _id) {
        return res.status(500).json({
          message: 'A member with that email already exists',
        });
      }
    }
  }
  const member = membersFound[0];
  member.name = name;
  member.email = email;
  member.city = city;
  await member.save();

  return res.status(200).json({ message: `Member ${name} saved successfully` });
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Member.deleteOne({ _id: id });

    return res.status(200).json({
      message: 'Member deleted successfully',
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
