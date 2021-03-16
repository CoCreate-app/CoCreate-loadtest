import ws from 'k6/ws';
import { check } from 'k6';

export default function() {
    var url = 'ws://echo.websocket.org';
    var params = { tags: { my_tag: 'hello' } };

    var response = ws.connect(url, params, function(socket) {
        socket.on('open', function open() {
            console.log('connected');
            socket.send(Date.now());

            socket.setInterval(function timeout() {
                socket.ping();
                console.log('Pinging every 1sec (setInterval test)');
            }, 1000);
        });

        socket.on('ping', function() {
            console.log('PING!');
        });

        socket.on('pong', function() {
            console.log('PONG!');
        });

        socket.on('pong', function() {
            // Multiple event handlers on the same event
            console.log('OTHER PONG!');
        });

        socket.on('message', function(message) {
            console.log(`Received message: ${message}`);
        });

        socket.on('close', function() {
            console.log('disconnected');
        });

        socket.on('error', function(e) {
            if (e.error() != 'websocket: close sent') {
                console.log('An unexpected error occured: ', e.error());
            }
        });

        socket.setTimeout(function() {
            console.log('2 seconds passed, closing the socket');
            socket.close();
        }, 2000);
    });

    check(response, { 'status is 101': (r) => r && r.status === 101 });
}