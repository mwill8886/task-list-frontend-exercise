import { styled } from '@mui/material';

export const Card = styled('div')(({ theme }) => ({
  backgroundColor: '#FFF',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  width: 'calc(100% - 32px)',
  maxWidth: '600px',
  overflow: 'hidden',
  boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.25)',
}));
