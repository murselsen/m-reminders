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
        const reminderItemContentElement = document.createElement('div');
        reminderItemContentElement.classList.add('remContent');

        // Reminder Item Icon - Label
        const reminderIconLabelElement = document.createElement('label');
        reminderIconLabelElement.classList.add('remChechbox');
        reminderIconLabelElement.setAttribute('for', `rem${reminder.id}`);

        // Reminder Item Icon - i
        const reminderIconItagElement = document.createElement('i');
        reminderIconItagElement.classList.add('fa-regular', 'fa-2x');
        reminderIconItagElement.id = `rem${reminder.id}Circle`;
        if (reminder.completed) {
          reminderIconItagElement.classList.add('fa-circle-check');
        } else {
          reminderIconItagElement.classList.add('fa-circle');
        }

        const reminderIconInputElement = document.createElement('input');
        reminderIconInputElement.type = 'checkbox';
        reminderIconInputElement.name = 'completed';
        reminderIconInputElement.id = `rem${reminder.id}`;
        reminderIconInputElement.hidden = false;
        reminderIconInputElement.checked = () => {
          reminderIconItagElement.classList.add('fa-circle-check');
        };

        reminderIconLabelElement.appendChild(reminderIconItagElement);
        reminderIconLabelElement.appendChild(reminderIconInputElement);
        reminderItemContentElement.appendChild(reminderIconLabelElement);

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
