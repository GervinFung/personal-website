.PHONY: build test
MAKEFLAGS += --silent

NODE_BIN=node_modules/.bin/
VITE_NODE=$(NODE_BIN)vite-node
NEXT=$(NODE_BIN)next

## install
install:
	pnpm i

install-mongo:
	$(VITE_NODE) script/mongo-setup/install.ts

migrate-mongo:
	mongosh < script/mongo-setup/document.js

echo-mongo:
	echo 'db.runCommand("ping").ok' | mongosh --quiet

## generate
generate: generate-webmanifest generate-sitemap

generate-webmanifest:
	$(VITE_NODE) script/site/webmanifest.ts

generate-sitemap:
	$(NODE_BIN)next-sitemap

## env
generate-environment-type-definition:
	$(VITE_NODE) script/env/type-def.ts

copy-env:
	$(VITE_NODE) script/env/copy.ts ${arguments}

copy-env-development:
	make copy-env arguments="-- --development"

copy-env-staging:
	make copy-env arguments="-- --staging"

copy-env-production:
	make copy-env arguments="-- --productions"

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

start-staging: copy-env-staging clear-cache start

start-production: copy-env-production clear-cache start

## build
build-development: clear-cache copy-env-development build

build-production: clear-cache copy-env-production build generate

build-staging: clear-cache copy-env-staging build

build-testing: clear-cache copy-env-testing build

build:
	$(NEXT) build

## start
start:
	$(NEXT) start $(arguments)

## dev
dev:
	$(NEXT) dev

## format
prettify:
	$(NODE_BIN)prettier --ignore-path .gitignore  --$(type) src/ test/ script/

format-check:
	make prettify type=check

format:
	make prettify type=write

## lint
lint:
	$(NODE_BIN)eslint src/ test/ -f='stylish' --color &&\
		make find-unused-exports &&\
		make find-unimported-files

## find unused exports
find-unused-exports:
	$(NODE_BIN)find-unused-exports

## find unimported files
find-unimported-files:
	$(NODE_BIN)unimported

## typecheck
typecheck:
	$(NODE_BIN)tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## test
test-type:
	$(NODE_BIN)vitest test/$(path)/**.test.ts $(arguments)

test-unit:
	make test-type path="unit" arguments="$(arguments)"

test-integration:
	make test-type path="integration" arguments="$(arguments)"

test-snapshot:
	make test-type path="snapshot" arguments="$(arguments)"

test: test-unit test-integration test-snapshot
