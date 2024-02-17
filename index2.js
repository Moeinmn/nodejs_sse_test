const axios = require('axios');
const EventSource = require('eventsource');

const sseServerUrl = 'http://localhost:8000/plotset/stream';
const postData = {
  // Your POST data here
};

axios.post(sseServerUrl, postData)
  .then((response) => {
    console.log('POST request successful:', response.data);

    // Proceed to establish SSE connection
    const eventSource = new EventSource(sseServerUrl);

    eventSource.onopen = () => {
      console.log('Connection to SSE server opened');
    };

    eventSource.onerror = (error) => {
      console.error('Error connecting to SSE server:', error);
    };

    eventSource.onmessage = (event) => {
      console.log('Received message:', event.data);
      // Handle the incoming event data here
    };

    // Optionally, you can listen to specific event types
    eventSource.addEventListener('customEvent', (event) => {
      console.log('Custom event received:', event.data);
      // Handle the specific event type here
    });

    // To close the connection when you're done
    // eventSource.close();

  })
  .catch((error) => {
    console.error('Error sending POST request:', error);
  });