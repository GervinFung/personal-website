start:
	cd backend && make start

start-watch:
	(trap 'kill 0' INT; (cd backend && make start-watch) & (cd frontend && make start-watch))

build:
	yarn concurrently "cd backend && make build" "cd frontend && make build"
