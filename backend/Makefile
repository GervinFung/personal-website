## declare PHONY
.PHONY: build

## start
start:
	node build/index.js

start-watch:
	node_modules/.bin/nodemon

start-dev:
	make compile && make start

## build
tsc=node_modules/.bin/tsc
add-js-extension:
	node_modules/.bin/ts-add-js-extension add --dir=build

clean-up:
	rm -rf .eslintrc .gitattributes .gitignore .prettierrc tsconfig.json tsconfig.*.json yarn.lock && \
		rm -rf src script && \
		yarn remove @types/express @types/node @types/nodemailer ts-add-js-extension typescript

build:
	rm -rf build && \
		$(tsc) -p tsconfig.prod.json && \
		make add-js-extension

compile:
	rm -rf build && \
		$(tsc) -p tsconfig.dev.json && \
		make add-js-extension

## type-check
typecheck:
	$(tsc) --pretty --skipLibCheck --noEmit

