// test_postgres.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 50 },
  ],
    insecureSkipTLSVerify: true
};

const BASE_URL = 'https://localhost:5002';

export function setup() {
    const loginUrl = 'https://localhost:5001/login';
    const payload = JSON.stringify({
        id: 'b90940ae-ae81-4f6c-b4f2-6986d0b91d4c',
        password: '12345'
    });
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: '30s', // Увеличиваем таймаут для setup
    };
    
    console.log('Получение токена авторизации...');
    const response = http.post(loginUrl, payload, params);
    
    if (response.status === 200) {
        const token = response.json();
        console.log('Токен успешно получен');
        return token;
    } else {
        console.error(`Ошибка авторизации: ${response.status} - ${response.body}`);
        throw new Error(`Failed to get auth token: ${response.status}`);
    }
}

export default function (data) {
    // Проверяем, что токен есть
	const authToken = data;
    if (!authToken) {
        console.error('Токен отсутствует!');
        return;
    }
  const user1 = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
;
  const user2 = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
;
  
  // Тест отправки сообщения
  const sendRes = http.post(`${BASE_URL}/dialog/${user1}/send`, JSON.stringify({
    toUserId: user2,
    text: `Test message ${Date.now()}`
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(sendRes, {
    'send message status 200': (r) => r.status === 200,
    'send message response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}