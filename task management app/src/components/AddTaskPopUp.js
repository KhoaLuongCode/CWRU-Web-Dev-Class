import React from 'react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Button,
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, DialogActions } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { showToast, ToastContain } from './ToastContain';

const AddTaskPopUp = ({
  popUpOpen,
  setPopUpOpen,
  dialogTitle,
  currentTask,
  setCurrentTask,
  tasks,
  setTasks,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState('low');
  const [titleError, setTitleError] = useState(false);
  const [titleUniqueError, setTitleUniqueError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDeadline(currentTask.deadline);
      setPriority(currentTask.priority);
    } else {
      resetForm();
    }
  }, [currentTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline(null);
    setPriority('low');
    setTitleError(false);
  };

  const checkTitleUnique = (newTitle) => {
    return tasks.some(
      (task) => task.title === newTitle && task !== currentTask
    );
  };

  const handleClose = () => {
    setPopUpOpen(false);
    setCurrentTask(null);
  };

  const handleAddTask = () => {
    let hasErrors = false;

    if (!title.trim()) {
      setTitleError(true);
      hasErrors = true;
    } else if (checkTitleUnique(title)) {
      setTitleUniqueError(true);
      hasErrors = true;
    } else {
      setTitleError(false);
    }

    if (!description.trim()) {
      setDescriptionError(true);
      hasErrors = true;
    } else {
      setDescriptionError(false);
    }

    if (!deadline || deadline.format('MM/DD/YYYY').length !== 10) {
      setDeadlineError(true);
      hasErrors = true;
    } else {
      setDeadlineError(false);
    }

    if (hasErrors) return;

    const newTask = {
      title,
      description,
      deadline,
      priority,
      isComplete: false,
    };
    setTasks([...tasks, newTask]);
    showToast('Task added successfully!', 'success');
    handleClose();
  };

  const handleUpdateTask = () => {
    let hasErrors = false;

    if (!description.trim()) {
      setDescriptionError(true);
      hasErrors = true;
    } else {
      setDescriptionError(false);
    }

    if (!deadline) {
      setDeadlineError(true);
      hasErrors = true;
    } else {
      setDeadlineError(false);
    }

    if (hasErrors) return;

    const updatedTasks = tasks.map((task) =>
      task.title === currentTask.title
        ? { ...task, title, description, deadline, priority }
        : task
    );
    setTasks(updatedTasks);
    showToast('Task updated successfully!', 'success');
    handleClose();
  };

  return (
    <Dialog
      open={popUpOpen}
      onClose={() => setPopUpOpen(false)}
      sx={{ '& .MuiDialog-paper': { width: '50%', maxWidth: '400px' } }}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#ADD8E6',
          fontWeight: 'bold',
          padding: '15px 24px',
          display: 'flex',
        }}
        justifyContent="center"
        position="relative"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {currentTask ? <EditNoteIcon /> : <AddCircleIcon />}
          <span>{dialogTitle}</span>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {!currentTask && (
          <TextField
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim()) {
                setTitleError(false);
                setTitleUniqueError(false);
              }
            }}
            error={titleError || titleUniqueError}
            helperText={
              titleError
                ? 'Title cannot be empty'
                : titleUniqueError
                ? 'Title must be unique'
                : ''
            }
            required={true}
          />
        )}
        <TextField
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (e.target.value.trim()) {
              setDescriptionError(false);
            }
          }}
          error={descriptionError}
          helperText={descriptionError ? 'Description cannot be empty' : ''}
          required={true}
        />
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          fullWidth
          margin="normal"
        >
          <DatePicker
            label="Deadline"
            value={deadline}
            onChange={(selectedDate) => {
              if (
                selectedDate &&
                selectedDate.format('MM/DD/YYYY').length === 10
              ) {
                setDeadline(selectedDate);
                setDeadlineError(false);
              } else {
                setDeadline(null);
                setDeadlineError(true);
              }
            }}
            fullWidth
            margin="normal"
            sx={{ my: 1.5, width: '100%' }}
            slotProps={{
              textField: {
                error: deadlineError,
                helperText: deadlineError ? 'Deadline is not selected' : '',
                required: true,
              },
            }}
          />
        </LocalizationProvider>

        <p> Priority </p>

        <RadioGroup row name="priority" value={priority}>
          <FormControlLabel
            value="low"
            control={<Radio />}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            label="Low"
          />
          <FormControlLabel
            value="medium"
            control={<Radio />}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            label="Medium"
          />
          <FormControlLabel
            value="high"
            control={<Radio />}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            label="High"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        {!currentTask ? (
          <Button
            variant="contained"
            onClick={handleAddTask}
            sx={{ backgroundColor: 'black', fontWeight: 'bold' }}
            startIcon={<AddCircleIcon />}
          >
            Add
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleUpdateTask}
            sx={{ backgroundColor: 'black', fontWeight: 'bold' }}
            startIcon={<EditNoteIcon />}
          >
            Edit
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ backgroundColor: 'red', fontWeight: 'bold' }}
          startIcon={<HighlightOffIcon />}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskPopUp;
