.PHONY: up
up-local:
	docker compose -f docker-compose.dev-local.yml up

.PHONY: up-d
up-d-local:
	docker compose -f docker-compose.dev-local.yml up -d

.PHONY: down
down-local:
	docker compose -f docker-compose.dev-local.yml down

.PHONY: build
build-local:
	docker compose -f docker-compose.dev-local.yml build
