const EventSource = require('eventsource');

const url = 'http://localhost:8000/plotset/stream'; // Replace with your SSE server URL

const eventSource = new EventSource(url);

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
