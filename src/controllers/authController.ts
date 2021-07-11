import { Response, Request } from 'express';
import { IUser } from '../types';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = <IUser>await User.findOne({ username: username });
    if (!user) {
      const error = new Error('User with that username does not exist');
      throw error;
    } else {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { username: username },
        { password: hashedPassword.toString() },
      );

      const token = jwt.sign(
        { username: username, id: user._id.toString() },
        'secret',
        { expiresIn: '1h' },
      );
      res.status(200).json({
        token: token,
        userId: user._id.toString(),
        username: username,
        success: true,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = <IUser>await User.findOne({ username: username });
    if (!user) {
      const error = new Error('User with that username does not exist');
      throw error;
    } else {
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('username or password does not exist');
        throw error;
      }
      const token = jwt.sign(
        { username: username, id: user._id.toString() },
        'secret',
        { expiresIn: '1h' },
      );
      res.status(200).json({
        token: token,
        id: user._id.toString(),
        username: username,
        success: true,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username, password } = req.body;
    await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: password,
    });
    await user.save();
    res
      .status(201)
      .json({ success: true, username: username, userId: user._id });
  } catch (error) {
    throw error;
  }
};

/*
const getUserByUsername = async (username: string): Promise<void> => {
    try {
        const user = await
    } catch (error) {
        throw error
    }
}


const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
} */
