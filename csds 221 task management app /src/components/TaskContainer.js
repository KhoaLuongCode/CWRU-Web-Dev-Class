import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditNoteIcon from '@mui/icons-material/EditNote';
import moment from 'moment';

function TaskContainer({ tasks, setTasks, handleDeleteTask, handleEditTask }) {
  const handleCompleteChange = (task) => {
    setTasks(
      tasks.map((t) =>
        t.title === task.title ? { ...t, isComplete: !t.isComplete } : t
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Title
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Description
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Deadline
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Priority
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Is Complete
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell align="center">{task.title}</TableCell>
              <TableCell align="center">{task.description}</TableCell>
              <TableCell align="center">
                {moment(task.deadline).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell align="center">{task.priority}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={task.isComplete}
                  onChange={(e) => handleCompleteChange(task, e.target.checked)}
                />
              </TableCell>
              <TableCell align="center">
                <Stack direction="column" spacing={1} alignItems="center">
                  {!task.isComplete && (
                    <Button
                      variant="contained"
                      onClick={() => handleEditTask(task)}
                      sx={{
                        width: '100px',
                        backgroundColor: 'black',
                        fontWeight: 'bold',
                      }}
                      startIcon={<EditNoteIcon />}
                    >
                      Update
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    sx={{
                      width: '100px',
                      backgroundColor: 'red',
                      fontWeight: 'bold',
                    }}
                    startIcon={<HighlightOffIcon />}
                    onClick={() => handleDeleteTask(task)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskContainer;
