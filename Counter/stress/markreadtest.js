import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Кастомные метрики
const errorRate = new Rate('errors');
const searchTrend = new Trend('search_endpoint_duration');

export const options = {
    stages: [
        { duration: '15s', target: 50 },  // Постепенно наращиваем до 50 пользователей
        { duration: '15s', target: 50 },  // Держим нагрузку
        { duration: '15s', target: 0 },   // Постепенно снижаем до 0
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
	
    const DIALOG_URL = 'https://localhost:5002';
    const COUNTER_URL = 'https://localhost:5003';
	const getRes = http.get(`${DIALOG_URL}/Dialog/b90940ae-ae81-4f6c-b4f2-6986d0b91d4c/list/all`);
	const messageId = JSON.parse(getRes.body).filter(e => !e.isRead)[0]?.id;
	if (!messageId) return;

    const headers = {
        'x-token': authToken,
        'Content-Type': 'application/json',
    };

    const sendUrl = `${COUNTER_URL}/Counters/mark-read`;
    const payload = JSON.stringify({
  "userId": "b90940ae-ae81-4f6c-b4f2-6986d0b91d4c",
  "messageId": messageId
});
    
    const markResponse = http.post(sendUrl,payload, { headers: headers });
    
    const markCheck = check(markResponse, {
        'status is 200': (r) => {
			return r.status === 202;
		},
        'IsSuccesful': (r) => {
			return !!JSON.parse(r.body)?.isSuccesful;
		}
    });
    
    errorRate.add(!markCheck);
    searchTrend.add(markResponse.timings.duration);

    sleep(1);
}