// loadtest.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Кастомные метрики
const errorRate = new Rate('errors');
const searchTrend = new Trend('endpoint_duration');

const usersCount = 2050;

const minX = 29.04;
const maxX = 30.75;
const minY = -2.62;
const maxY = -1.26;

function getRandomExtent() {
  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;
  const zoom =  Math.floor(Math.random() * (15) + 1);
  const width = zoom > 10 ? .05 : .1;
  return {zoom: zoom, extent: [x, y, x+width, y+width]};
}

export const options = {
    stages: [
        { duration: '10s', target: usersCount },  // Постепенно наращиваем
        { duration: '10s', target: usersCount },  // Держим нагрузку
        { duration: '10s', target: 0 },   // Постепенно снижаем до 0
    ],
    thresholds: {
        errors: ['rate<0.01'], // Меньше 1% ошибок
    },
    insecureSkipTLSVerify: true, 
};

export default function () {
	const parameters = getRandomExtent();
	let url = parameters.zoom >=12 ? 'https://localhost:5001/Field/by-bounding-box' : 'https://localhost:5001/Cluster/by-bounding-box';
	
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
        
    const boundingResponse = http.post(url, JSON.stringify(parameters), params);
	
    const boundingCheck = check(boundingResponse, {
        'status is 200': (r) => r.status === 200
    });
    
    errorRate.add(!boundingCheck);
    searchTrend.add(boundingResponse.timings.duration);

    sleep(1);
}