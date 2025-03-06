import axios from 'axios';

const renderReminders = () => {
  console.time('renderReminders');
  const remindersList = document.querySelector('#remindersList');
  // remindersList.innerHTML = '';

  axios
    .get('/api/todos')
    .then(res => {
      let reminders = res.data;
      console.log('Reminders: ', reminders);

      reminders.forEach(reminder => {
        // Reminder Item - Li
        const reminderItemElement = document.createElement('li');
        reminderItemElement.classList.add('reminder-item');
        reminderItemElement.id = `remTodo${reminder.id}`;

        // Reminder Item Content - Div
        reminderItemContentElement = document.createElement('div');
        reminderItemContentElement.classList.add('remContent');

        // Reminder Item Icon - Label
        const reminderIconElement = document.createElement('label');
        reminderIconElement.classList.add('rem')

        reminderItemElement.appendChild(reminderItemContentElement);

        remindersList.appendChild(reminderItemElement);
      });
    })
    .catch(err => {
      console.error('Error: ', err);
    });

  console.timeEnd('renderReminders');
};
renderReminders();
