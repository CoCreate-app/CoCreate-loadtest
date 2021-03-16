import http from 'k6/http';

export let options = {
    vus: 100,
    duration: '20s',
    rps: 500
};


export default function() {
    http.get('http://test.k6.io/');
}