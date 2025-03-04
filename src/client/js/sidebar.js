import axios from 'axios';

axios
  .get('api/tod-os')
  .then(response => {
    console.log('Api - Todos = Response:', response);
  })
  .catch(error => {
    console.error('Api - Todos = Error:', error);
  });
