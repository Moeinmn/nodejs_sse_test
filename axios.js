const axios = require('axios');
const { createReadStream } = require('fs');

let sseEndpoint = "http://localhost:8000/plotset/stream"

async function test(){
    try {
        const { data } = await axios.post(sseEndpoint , {
            input: "what is plotset?"
        });
        const stream = createReadStream(data, { encoding: 'utf8' });
    
        stream.on('data', chunk => {
            // Send SSE data to client
            //res.write(`data: ${chunk}\n\n`);
            console.log(1111,chunk);
        });
    
        stream.on('end', () => {
            console.log(2222);
            //res.end();
        });
    
        stream.on('error', error => {
            console.log(3333);
            console.error('Error reading SSE stream:', error);
            //res.end();
        });
    } catch (error) {
        console.log(4444);
        console.error('Error fetching SSE data:', error);
    }
}

test();