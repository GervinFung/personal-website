start:
	cd backend && make start

start-watch:
	(trap 'kill 0' INT; (cd backend && make start-watch) & (cd frontend && make start-watch))

build:
	node_modules/.bin/concurrently "cd backend && yarn build" "cd frontend && yarn build"
