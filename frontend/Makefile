## declare PHONY
.PHONY: build test

## typecheck
typecheck:
	node_modules/.bin/tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## start
start:
	(trap 'kill 0' INT; make build & make typecheck-watch)

## build
pre-build:
	rm -rf build && cp -R public build

## pwa
generate-sw:
	node_modules/.bin/workbox generateSW workbox-config.cjs

transpile:
	node script/esbuild.js && node script/terser.js

build: pre-build
	make generate-sw && make transpile

## clean-up
clean-up:
	rm -rf .eslintrc .gitattributes .gitignore .prettierrc *.json workbox-config.cjs yarn.lock && \
		rm -rf src script public node_modules

## lint
lint:
	node_modules/.bin/eslint src/** -f='stylish' --color

## format
prettier=node_modules/.bin/prettier
format:
	$(prettier) --write src/

format-check:
	$(prettier) --check src/

## test
test:
	node_modules/.bin/esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		node_modules/.bin/jest __test__
