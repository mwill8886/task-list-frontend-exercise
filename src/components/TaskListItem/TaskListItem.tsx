import React, { useEffect, useState } from 'react';
import {
  styled,
  Box,
  Checkbox,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleTaskIsDone } from '@/redux/reducers/tasksSlice';
import { DateTime } from 'luxon';

//
// Styles
//
const ComponentWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'reminder',
})<{ reminder?: boolean }>(({ theme, reminder }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  padding: theme.spacing(1, 2),
  paddingLeft: theme.spacing(1),
  fontWeight: reminder ? 'bold' : 'normal',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const LabelContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isDone',
})<{ isDone?: boolean }>(({ isDone }) => ({
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textDecoration: isDone ? 'line-through' : 'none',
}));

//
// Models
//
export type TaskType = {
  id: string;
  label: string;
  isDone: boolean;
  createdAt: number;
  description?: string;
  reminder?: string;
};

//
// Component
//
export const TaskListItem: React.FC<{ task: TaskType }> = (props) => {
  const { task } = props;
  const [reminder, setReminder] = useState<boolean>(false);
  const [openReminder, setOpenReminder] = useState<boolean>(false); // TODO: this is for the snackbar, move to using a manager + context or redux
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleTaskIsDone(task.id));
  };

  const handleClick = () => {
    navigate(`/task/${task.id}`);
  };

  // Setting a rudimentary reminder alert
  useEffect(() => {
    const hasReminder = !!task.reminder
      ? DateTime.fromISO(task.reminder).toMillis() < DateTime.now().toMillis()
      : false;

    if (hasReminder) {
      setReminder(true);
      setOpenReminder(true);
    }
  }, [task]);

  return (
    <>
      <ComponentWrapper onClick={handleClick} reminder={reminder}>
        <Box
          mr={1}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Checkbox
            onChange={handleCheck}
            checked={task.isDone}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
        <LabelContainer isDone={task.isDone}>{task.label}</LabelContainer>
        {!!task.reminder && !task.isDone && (
          <Box ml={1}>
            <AlarmIcon
              htmlColor={reminder ? theme.palette.error.main : 'inherit'}
            />
          </Box>
        )}
      </ComponentWrapper>
      {/* Snackbar for reminder  */}
      {/* TODO: this should be moved to a manger at the base of the app, also add an interval check if withing a few min  */}
      <Snackbar
        open={openReminder}
        autoHideDuration={10000}
        onClose={() => setOpenReminder(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error">Reminder: {task.label}</Alert>
      </Snackbar>
    </>
  );
};
