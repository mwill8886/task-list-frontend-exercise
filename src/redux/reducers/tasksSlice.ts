import { TaskType } from '@/components';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState: Array<TaskType> = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<Omit<TaskType, 'id' | 'createdAt' | 'isDone'>>
    ) => {
      // add uuid to task like a database would
      // db would also have a userId
      const newTask: TaskType = {
        id: uuidv4(),
        createdAt: Date.now(),
        isDone: false,
        ...action.payload,
      };
      return [...state, newTask];
    },
    removeTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => {
        if (task.id !== action.payload) {
          return task;
        }
      });
    },
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        taskInfo: Omit<TaskType, 'id' | 'createdAt' | 'isDone'>;
      }>
    ) => {
      return state.map((task) => {
        if (task.id !== action.payload.taskId) {
          return task;
        }
        return { ...task, ...action.payload.taskInfo };
      });
    },
    toggleTaskIsDone: (state, action: PayloadAction<string>) => {
      return state.map((task) => {
        if (task.id !== action.payload) {
          return task;
        }
        return { ...task, isDone: !task.isDone };
      });
    },
    removeCompletedTasks: (state) => {
      return state.filter((task) => {
        if (!task.isDone) {
          return task;
        }
      });
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTask,
  toggleTaskIsDone,
  removeCompletedTasks,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
