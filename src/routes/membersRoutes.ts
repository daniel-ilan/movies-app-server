import { Router } from 'express';
import isAuth from '../middlware/isAuth';
import {
  getAllMembers,
  addNewMember,
  editMember,
  deleteMember,
} from '../controllers/membersController';

const router: Router = Router();

router.get('/all-members', isAuth, getAllMembers);

router.post('/add-new-member', isAuth, addNewMember);

router.post('/edit-member', isAuth, editMember);

router.delete('/delete-member/:id', isAuth, deleteMember);

export default router;
