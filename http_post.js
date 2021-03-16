import { sleep } from 'k6';
import http from 'k6/http';


export function setup() {
    var url = 'http://test.k6.io/login.php';
    var payload = JSON.stringify({
        login: 'admin',
        password: '123'
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post(url, payload, params);
}

export function teardown() {

}

export default function() {
    sleep(1);
}