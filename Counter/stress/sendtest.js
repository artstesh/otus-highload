import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Кастомные метрики
const errorRate = new Rate('errors');
const searchTrend = new Trend('search_endpoint_duration');

export const options = {
    stages: [
        { duration: '5s', target: 50 },  // Постепенно наращиваем до 50 пользователей
        { duration: '5s', target: 50 },  // Держим нагрузку
        { duration: '5s', target: 0 },   // Постепенно снижаем до 0
    ],
    thresholds: {
        errors: ['rate<0.01'], // Меньше 1% ошибок
    },
    insecureSkipTLSVerify: true, 
};

// Глобальная переменная для хранения токена
let authToken = '';

// Функция setup выполняется один раз перед началом теста
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
	
    const BASE_URL = 'https://localhost:5002';
	const fromUserId = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

    const headers = {
        'x-token': authToken,
        'Content-Type': 'application/json',
    };

    const sendUrl = `${BASE_URL}/Dialog/${fromUserId}/send`;
    const payload = JSON.stringify({
  "toUserId": "b90940ae-ae81-4f6c-b4f2-6986d0b91d4c",
  "text": `Test message ${Date.now()}`
});
    
    const searchResponse = http.post(sendUrl,payload, { headers: headers });
    
    const searchCheck = check(searchResponse, {
        'search user status is 200': (r) => r.status === 200
    });
    
    errorRate.add(!searchCheck);
    searchTrend.add(searchResponse.timings.duration);

    sleep(1);
}