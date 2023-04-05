import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { AddTaskView, ListView, TaskItemView } from '@/views';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" Component={ListView} />
      <Route path="/task/add" Component={AddTaskView} />
      <Route path="/task/:taskId" Component={TaskItemView} />
      {/* <Route path="/login" /> */}
      {/* <Route path="/signup" /> */}
    </>
  )
);
