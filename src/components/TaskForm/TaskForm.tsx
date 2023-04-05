/*

For higher reusability the component that consumes this form dictates the submit and cancel functions

*/

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  Typography,
  Divider,
} from '@mui/material';
import { TaskType } from '@/components';
import { useDispatch } from 'react-redux';
import { removeTask } from '@/redux/reducers/tasksSlice';
import { useNavigate } from 'react-router-dom';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DateTime } from 'luxon';

//
// Models
//

export type FormInputTypes = {
  task: string;
  description?: string;
  reminder?: string; //TODO: cant find the proper DateTime type for luxon object -> moving on temporarily
};

const schema = yup.object().shape({
  task: yup.string().required('Please insert a task'),
});

interface ITaskForm {
  onSubmit: (values: FormInputTypes) => void;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  task?: TaskType;
}

//
// Component
//
export const TaskForm = (props: ITaskForm) => {
  const {
    task,
    submitLabel = 'Save',
    cancelLabel = 'Cancel',
    onSubmit,
    onCancel,
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputTypes>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  // TODO: this is not the best UI or component layout. Putting it here so I can reuse the form.
  const handleDelete = () => {
    setOpen(false);
    if (!!task?.id) {
      dispatch(removeTask(task.id));
      navigate('/');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <Controller
            name="task"
            defaultValue={task?.label ?? ''}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                type="text"
                label="Task"
                autoFocus={!!task ? false : true}
                fullWidth
                {...field}
                error={!!errors.task}
                helperText={errors.task?.message}
              />
            )}
          />
        </Box>
        <Box mb={4}>
          <Controller
            name="description"
            defaultValue={task?.description ?? ''}
            control={control}
            render={({ field }) => (
              <TextField
                multiline={true}
                label="Description"
                rows={3}
                fullWidth
                {...field}
              />
            )}
          />
        </Box>
        <Box mb={4}>
          <Controller
            name="reminder"
            control={control}
            render={({ field }) => (
              <DesktopDateTimePicker
                label="Set Reminder"
                defaultValue={
                  task?.reminder ? DateTime.fromISO(task?.reminder) : null
                }
                sx={{ width: '100%' }}
                {...field}
              />
            )}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          {!!task?.id && (
            <Box flex="1">
              <Button type="button" color="error" onClick={handleOpenDialog}>
                Delete Task
              </Button>
            </Box>
          )}
          <Box display="flex">
            <Box mr={2}>
              <Button type="button" onClick={onCancel}>
                {cancelLabel}
              </Button>
            </Box>
            <Button variant="contained" type="submit">
              {submitLabel}
            </Button>
          </Box>
        </Box>
      </form>
      {/* Confirm delete dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <Box p={2}>
          <Typography variant="h5">Confirm Delete</Typography>
          <Divider />
          <Box mt={2}>
            <Typography>Are you sure you want to delete task:</Typography>
            <Typography>
              <strong>{task?.label}</strong>
            </Typography>
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Box mr={2}>
              <Button onClick={handleCloseDialog}>Cancel</Button>
            </Box>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
