.PHONY: build test all
MAKEFLAGS += --silent

all:
	make lint &&\
		make typecheck &&\
		make format-check &&\
		make test &&\

NODE_BIN=node_modules/.bin/
VITE_NODE=$(NODE_BIN)vite-node
NEXT=$(NODE_BIN)next

## install
install:
	pnpm i --frozen-lockfile

install-mongo:
	$(VITE_NODE) script/mongo-setup

setup-mongo:
	sudo systemctl unmask mongod
	sudo systemctl start mongod
	sudo systemctl stop mongod
	sudo systemctl restart mongod
	mongosh < script/mongo-setup/document.js

## generate
generate: generate-portfolio-data generate-resume

generate-portfolio-data:
	$(VITE_NODE) script/projects/generate-data.ts ${arguments}

generate-resume:
	$(VITE_NODE) script/resume/generate.ts

generate-portfolio-data-force:
	make generate-portfolio-data arguments="-- --f"

generate-webmanifest:
	$(VITE_NODE) script/site/webmanifest.ts

generate-sitemap:
	$(NODE_BIN)next-sitemap

check-projects-image-asset:
	$(VITE_NODE) script/projects/ensure-background-has-logo-vice-versa.ts

## env
copy-env:
	$(VITE_NODE) script/env/copy.ts ${arguments}

development:
	make copy-env arguments="-- --development"

staging:
	make copy-env arguments="-- --staging"

production:
	make copy-env arguments="-- --productions"

testing:
	make copy-env arguments="-- --testing"

## deployment
deploy-staging: build-staging
	vercel

deploy-production: build-production
	vercel --prod

clear-cache:
	rm -rf .next

start-development: development clear-cache
	$(NEXT) dev

start-staging: staging clear-cache start

start-production: production clear-cache start

## build
build-development: clear-cache check-projects-image-asset development build

build-production: clear-cache check-projects-image-asset production build

build-staging: clear-cache check-projects-image-asset staging build

build-testing: clear-cache check-projects-image-asset testing build

build:
	$(NEXT) build && make generate-sitemap && make generate-webmanifest

## start
start:
	$(NEXT) start $(arguments)

## format
prettify:
	$(NODE_BIN)prettier --ignore-path .gitignore  --$(type) src/ test/

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
tsc=$(NODE_BIN)tsc

typecheck:
	$(tsc) -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## test
test-type:
	$(NODE_BIN)vitest test/$(path)/**.test.ts

test-unit:
	make test-type path="unit"

test-integration:
	make build-testing && make test-type path="integration"

test-snapshots:
	make build-testing && make test-type path="snapshots"

test: test-unit test-integration test-snapshots
