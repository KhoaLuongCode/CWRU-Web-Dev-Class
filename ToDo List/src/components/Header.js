import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddButton from './AddButton';

const Header = ({ handleClickAdd }) => {
  return (
    <Box
      display="flex"
      sx={{ width: '100%', height: '70px', backgroundColor: 'black' }}
      justifyContent="center"
      alignContent="center"
      position="relative"
    >
      <Stack
        display="flex"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <MenuIcon sx={{ fontSize: '30px' }} />
        <Typography
          variant="h5"
          sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          Task Management
        </Typography>
      </Stack>
      <Box
        display="flex"
        sx={{ position: 'absolute', top: '10px', right: '80px' }}
      >
        <AddButton handleClick={handleClickAdd} />
      </Box>
    </Box>
  );
};

export default Header;
