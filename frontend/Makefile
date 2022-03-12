## declare PHONY
.PHONY: build

## type check
tsc=node_modules/.bin/tsc
typecheck:
	$(tsc) --pretty --skipLibCheck --noEmit

## start
start:
	(trap 'kill 0' INT; make typecheck & make compile)

start-watch:
	node_modules/.bin/nodemon

## compile
compile:
	rm -rf build\
		&& cp -R public build\
		&& node script/esbuild.js\
		&& node script/terser.js

## build
build:
	make compile && \
		rm -rf node_modules && \
		rm -rf .eslintrc .gitattributes .gitignore .prettierrc *.json craco.config.js yarn.lock
