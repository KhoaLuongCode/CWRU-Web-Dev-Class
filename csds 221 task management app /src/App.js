import React, { useState } from 'react';
import './style.css';
import AddTaskPopUp from './components/AddTaskPopUp';
import Header from './components/Header';
import TaskContainer from './components/TaskContainer';
import { showToast, ToastContain } from './components/ToastContain';

const App = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const handleClickAdd = () => {
    setDialogTitle('Add Task');
    setPopUpOpen(true);
    setCurrentTask(null);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setDialogTitle('Edit Task');
    setPopUpOpen(true);
  };

  const handleDeleteTask = (task) => {
    setTasks(tasks.filter((t) => t.title !== task.title));
    showToast('Task deleted successfully!', 'success');
  };

  return (
    <div>
      <Header handleClickAdd={handleClickAdd} />
      <ToastContain />
      <TaskContainer
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        setTasks={setTasks}
        handleEditTask={handleEditTask}
      />
      {popUpOpen && (
        <AddTaskPopUp
          popUpOpen={popUpOpen}
          setPopUpOpen={setPopUpOpen}
          setTasks={setTasks}
          dialogTitle={dialogTitle}
          tasks={tasks}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
      )}
    </div>
  );
};

export default App;
