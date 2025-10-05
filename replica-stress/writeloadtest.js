import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

// Кастомные метрики для мониторинга
const writeSuccess = new Counter('write_success');
const writeDuration = new Trend('write_duration');

export const options = {
    stages: [
        { duration: '10s', target: 10 },   // Постепенный набор нагрузки
        { duration: '300s', target: 20 },    // Основная нагрузка
        { duration: '10s', target: 0 },    // Постепенное снижение
    ],
    thresholds: {
        write_success: ['count>=100'],     // Минимум 100 успешных записей
        http_req_duration: ['p(95)<1000'], // 95% запросов < 1s
    },
    insecureSkipTLSVerify: true
};

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
    const url = 'https://localhost:5001/User/generate?count=10';
    
    const params = {
        headers: { 'x-token': authToken,'Content-Type': 'application/json' },
        tags: { name: 'write_user' },
    };
    
    const startTime = Date.now();
    const res = http.post(url, {}, params);
    const duration = Date.now() - startTime;
    
    const checkRes = check(res, {
        'write status is 200': (r) => r.status === 200
    });
    
    if (checkRes) {
        writeSuccess.add(1);
        writeDuration.add(duration);
    }
    
    sleep(0.5); // 2 запроса в секунду на VU
}