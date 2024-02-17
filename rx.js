const { Observable } = require('rxjs');

const { map } = require('rxjs/operators');

async function name() {
  const response = await fetch('http://localhost:8000/plotset/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/event-stream'
    },
    body: JSON.stringify({
      "input": "what is plotset?"
    })
  });

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

  return new Observable(async observer => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        observer.complete();
        break;
      }
      console.log('Fetch Recieved:', value);
      observer.next(value);
    }
  });
}

async function test(){
    let x = await name();

x.pipe(
  map(value => {
    // Do any processing or transformation here
    let originalStr = value.toString();
    let secondLine = originalStr.split('\n')[1];
    let onlyVal = secondLine.replace('data:', '')
    return onlyVal; // For example, convert the value to a string
  })
).subscribe({
  next: value => console.log('Received:', value),
  error: error => console.error('Error:', error),
  complete: () => console.log('Stream completed')
});
}

test();