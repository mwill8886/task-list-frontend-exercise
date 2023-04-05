import React from 'react';
import { Typography, Box, Divider, IconButton } from '@mui/material';
import {
  TaskType,
  Card,
  PageWrapper,
  TaskForm,
  FormInputTypes,
} from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '@/redux/reducers/tasksSlice';
import { RootState } from '@/redux/store';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';

//
// Component
//
export const TaskItemView = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) =>
    state.tasks.find((task) => task.id === taskId)
  );

  const handleCloseClick = () => {
    navigate(-1);
  };

  const onSubmit = (values: FormInputTypes) => {
    if (task) {
      // update task
      const newTask: Omit<TaskType, 'id' | 'createdAt' | 'isDone'> = {
        label: values.task,
        description: values.description,
        reminder: values.reminder,
      };
      const updatePayload = {
        taskId: task.id,
        taskInfo: newTask,
      };
      dispatch(updateTask(updatePayload));
      navigate('/');
    }
  };

  return (
    <PageWrapper>
      <Card>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Review Task Details</Typography>
          <IconButton onClick={handleCloseClick}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box mt={5}>
          <TaskForm
            onSubmit={onSubmit}
            submitLabel="Update"
            onCancel={handleCloseClick}
            task={task}
          />
        </Box>
      </Card>
    </PageWrapper>
  );
};
