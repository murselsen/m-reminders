import axios from 'axios';

const renderReminders = () => {
  console.time('renderReminders');
  const remindersList = document.querySelector('#remindersList');
  remindersList.innerHTML = '';

  axios.get('/')

  console.timeEnd('renderReminders');
};
