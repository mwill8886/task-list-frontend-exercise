import React from 'react';
import { Typography, Box, Divider, IconButton } from '@mui/material';
import {
  TaskType,
  Card,
  PageWrapper,
  TaskForm,
  FormInputTypes,
} from '@/components';
import { useDispatch } from 'react-redux';
import { addTask } from '@/redux/reducers/tasksSlice';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

//
// Component
//
export const AddTaskView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate(-1);
  };

  const onSubmit = (values: FormInputTypes) => {
    const newTask: Omit<TaskType, 'id' | 'createdAt' | 'isDone'> = {
      label: values.task,
      description: values.description,
      reminder: values.reminder,
    };
    dispatch(addTask(newTask));
    navigate('/');
  };

  return (
    <PageWrapper>
      <Card>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Create Task</Typography>
          <IconButton onClick={handleCloseClick}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box mt={5}>
          <TaskForm onSubmit={onSubmit} onCancel={handleCloseClick} />
        </Box>
      </Card>
    </PageWrapper>
  );
};
