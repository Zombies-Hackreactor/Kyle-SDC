import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  vus: 500,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(99)<2000'],
  },
}

const prodID = Math.floor(Math.random() * (1000011 - 1) + 1)

const defaultHost = 'http://localhost:4000'

export default function () {
  http.get(`${defaultHost}/api/reviews/${prodID}`)
  sleep(1)
}
