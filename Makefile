start:
	cd backend && make start

start-watch:
	(trap 'kill 0' INT; (cd backend && make start-watch) & (cd frontend && make start-watch))

build:
	yarn && ./node_modules/bin/concurrently "cd backend && yarn && make build" "cd frontend && yarn && make build"
