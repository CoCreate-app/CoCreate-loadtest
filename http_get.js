import { sleep } from 'k6';
import http from 'k6/http';


export function setup() {
    let res = http.get('https://httpbin.org/get');
    return { data: res.json() };
}

export function teardown(data) {
    console.log(JSON.stringify(data));
}

export default function(data) {
    sleep(1);
}