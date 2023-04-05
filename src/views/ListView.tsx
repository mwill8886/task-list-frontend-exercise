import { Typography, Box, Divider, Button } from '@mui/material';
import { TaskListItem, Card, PageWrapper } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { removeCompletedTasks } from '@/redux/reducers/tasksSlice';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';

//
// Component
//
export const ListView = () => {
  // TODO: get logged in users tasks
  // TODO: replace redux with database and api - using redux for now
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const handleAdd = () => {
    navigate('/task/add');
  };

  const handleClear = () => {
    dispatch(removeCompletedTasks());
  };

  // TODO: move page wrapper to a layout
  // TODO: null state
  return (
    <PageWrapper>
      <Card>
        <Typography variant="h4">Users Task List</Typography>
        <Divider />
        <Box mt={2}>
          {[...tasks]
            .sort((a, b) => {
              if (a.isDone < b.isDone) return -1;
              if (a.isDone > b.isDone) return 1;
              return 0;
            })
            .map((task, index) => {
              return <TaskListItem key={`task-${task.id}`} task={task} />;
            })}
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Box>
            {tasks?.length > 0 && (
              <Button onClick={handleClear} color="error">
                Clear Done
              </Button>
            )}
          </Box>

          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Card>
    </PageWrapper>
  );
};
