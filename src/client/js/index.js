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
        const reminderItemHtmlObject = {
          element: 'li',
          id: `remTodo${reminder.id}`,
          classList: ['reminder-item'],
          children: [
            {
              element: 'div',
              classList: ['remContent'],
              children: [],
            },
            { ele},
          ],
        };

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

        const reminderIconInputElement = document.createElement('input');
        reminderIconInputElement.type = 'checkbox';
        reminderIconInputElement.name = 'completed';
        reminderIconInputElement.id = `rem${reminder.id}`;
        reminderIconInputElement.hidden = true;
        reminderIconInputElement.addEventListener('change', e => {
          reminderIconItagElement.classList.toggle('fa-circle');
          reminderIconItagElement.classList.toggle('fa-circle-check');
        });

        if (reminder.completed) {
          reminderIconItagElement.classList.add('fa-circle-check');
          reminderIconItagElement.classList.remove('fa-circle');
          reminderIconInputElement.checked = true;
        } else {
          reminderIconItagElement.classList.add('fa-circle');
          reminderIconInputElement.checked = false;
        }

        reminderIconLabelElement.appendChild(reminderIconItagElement);
        reminderIconLabelElement.appendChild(reminderIconInputElement);
        reminderItemContentElement.appendChild(reminderIconLabelElement);

        // Reminder Info - Div
        const reminderItemContentInfoElement = document.createElement('div');
        reminderItemContentInfoElement.classList.add('remInfo');

        // Reminder Info Title - h4
        const reminderItemContentInfoTitleElement =
          document.createElement('h4');
        reminderItemContentInfoTitleElement.classList.add('title');
        reminderItemContentInfoTitleElement.textContent = reminder.title;

        reminderItemContentInfoElement.appendChild(
          reminderItemContentInfoTitleElement
        );

        reminderItemContentElement.appendChild(reminderItemContentInfoElement);
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
