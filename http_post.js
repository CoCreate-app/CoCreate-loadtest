import { sleep } from 'k6';
import http from 'k6/http';

export let options = {
    vus: 100,
    duration: '20s',
    rps: 500
};


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