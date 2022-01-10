start-dev:
	cd frontend && yarn start & cd backend && yarn start-dev

start:
	cd backend && yarn start

build-dev:
	cd backend && yarn && yarn build-dev & cd frontend && yarn && yarn build-dev

build:
	cd backend && yarn && yarn build & cd frontend && yarn && yarn build

clean:
	cd backend && yarn clean & cd frontend && yarn clean

install:
	cd backend && yarn & cd frontend && yarn

