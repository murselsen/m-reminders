import axios from 'axios';

axios
  .get('api/todos')
  .then(response => {
    console.log('Api - Todos = Response:', response);
  })
  .catch(error => {
    console.log('Api - Todos = Err:', error);
  });
