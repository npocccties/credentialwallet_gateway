.PHONY: up
up-local:
	docker compose -f docker-compose.local.yml up --build

.PHONY: down
down-local:
	docker compose -f docker-compose.local.yml down

.PHONY: build
build-local:
	docker compose -f docker-compose.local.yml build
