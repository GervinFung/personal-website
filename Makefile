.PHONY: build test
MAKEFLAGS += --silent

## docker setup ubuntu
install-docker:
	# ref: https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
	sudo apt-get update
	sudo apt-get install -y ca-certificates curl gnupg
	sudo install -m 0755 -d /etc/apt/keyrings
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
	sudo chmod a+r /etc/apt/keyrings/docker.gpg

	echo \
	  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
	  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
	  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	sudo apt-get update
	sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

	sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose
	docker-compose --version

## install
install:
	pnpm i

install-mongo:
	docker pull mongo

start-mongo:
	docker-compose up --detach mongodb

stop-mongo:
	docker-compose down mongodb

migrate-mongo:
	mongosh < script/mongo-setup/document.js

echo-mongo:
	echo 'db.runCommand("ping").ok' | mongosh --quiet

## telemetry
opt-out-telemetry:
	pnpm next telemetry disable

## generate
generate: generate-webmanifest generate-sitemap

generate-webmanifest:
	pnpm vite-node script/site/webmanifest.ts

generate-sitemap:
	pnpm next-sitemap

## env
generate-environment-type-definition:
	pnpm vite-node script/env/type-def.ts

copy-env:
	pnpm vite-node script/env/copy.ts ${arguments}

copy-env-development:
	make copy-env arguments="-- --development"

copy-env-staging:
	make copy-env arguments="-- --staging"

copy-env-production:
	make copy-env arguments="-- --production"

copy-env-testing:
	make copy-env arguments="-- --testing"

## deployment
deploy-staging: build-staging
	vercel

deploy-production: build-production
	vercel --prod

clear-cache:
	rm -rf .next

start-development: copy-env-development clear-cache dev

start-testing: copy-env-testing clear-cache dev

start-staging: copy-env-staging clear-cache dev

start-production: copy-env-production clear-cache dev

## build
build-development: clear-cache copy-env-development build

build-production: clear-cache copy-env-production build generate

build-staging: clear-cache copy-env-staging build

build-testing: clear-cache copy-env-testing build

build:
	pnpm next build

## start
start:
	pnpm next start $(arguments)

## dev
dev:
	pnpm next dev

## format
format-generate-config:
	pnpm prettier-config-generate

format:
	pnpm prettier --$(type) .

format-check:
	make format type=check

format-write:
	make format type=write

## lint
lint:
	pnpm eslint --ignore-path .gitignore . --ext .mjs,.tsx,.ts --color && pnpm knip

## typecheck
typecheck:
	pnpm tsc -p tsconfig.json --noEmit $(arguments)

## test
test-type:
	pnpm vitest test/$(path)/**.test.ts $(arguments)

test-unit:
	make test-type path="unit" arguments="$(arguments)"

test-integration:
	make test-type path="integration" arguments="$(arguments)"

test-snapshot:
	make test-type path="snapshot" arguments="$(arguments)"

test: build-testing test-unit test-integration test-snapshot
