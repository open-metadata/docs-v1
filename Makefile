.PHONY: up
up:
	yarn dev

.PHONY: dev
dev:
	yarn dev

.PHONY: start
start:
	yarn start

.PHONY: build
build:
	yarn build

.PHONY: serve
serve:
	yarn serve

.PHONY: clear
clear:
	yarn clear

.PHONY: search
search:
	python -m venv search-venv; \
		. search-venv/bin/activate; \
		pip install -r scripts/requirements.txt; \
		python scripts/build_search_index.py; \
		rm -rf search-venv;

.PHONY: docker-build
docker-build:
	docker build -t openmetadata-docs:local .