start:
	cd backend && make start

start-watch:
	(trap 'kill 0' INT; (cd backend && make start-watch) & (cd frontend && make start-watch))

install:
	(trap 'kill 0' INT; (cd backend && yarn) & (cd frontend yarn)) &
		wait;

build:
	(trap 'kill 0' INT; (cd backend && make build) & (cd frontend && make build))
