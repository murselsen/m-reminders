import axios from 'axios';

const renderReminders = () => {
  console.time('renderReminders');
  const remindersList = document.querySelector('#remindersList');
  remindersList.innerHTML = '';

  axios
    .get('/api/todos')
    .then(res => {
      
    })
    .catch(err => {});

  console.timeEnd('renderReminders');
};
