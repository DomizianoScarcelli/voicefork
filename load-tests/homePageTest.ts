import http from "k6/http"
import { check, sleep } from "k6"

export const options = {
	stages: [
		{ duration: "10s", target: 10 },
		{ duration: "20s", target: 50 },
		{ duration: "10", target: 0 },
	],
}

export default function () {
	const res = http.get("http://localhost:3000/restaurants/search-restaurants?query=blu%20bar&latitude=41.909734&longitude=12.349999&maxDistance=5000&page=1")
	check(res, { "status was 200": (r) => r.status == 200 })
	sleep(1)
}
