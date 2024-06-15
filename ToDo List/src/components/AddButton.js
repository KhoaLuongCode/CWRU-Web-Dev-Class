import React from 'react';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddButton = ({ handleClick }) => {
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        color: 'black',
        backgroundColor: 'lightblue',
        fontWeight: 'bold',
        mt: 1,
      }}
      startIcon={<AddCircleIcon />}
    >
      Add!
    </Button>
  );
};

export default AddButton;
