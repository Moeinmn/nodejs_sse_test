async function name() {
    const response = await fetch('http://localhost:8000/plotset/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/event-stream'
    },
    body: JSON.stringify({
        "input": "what is plotset?"
      })
  })
const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
while (true) {
  const {value, done} = await reader.read();
  if (done) break;
  console.log(typeof value);
  console.log('Received', value);
}
}

name();