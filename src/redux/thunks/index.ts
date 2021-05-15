import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserById } from '../../services/firebase';

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId: string) => {
    return await getUserById(userId);
  }
);
