.PHONY: up
up-local:
	docker compose -f docker-compose.dev-local.yml up

.PHONY: up-d
up-d-local:
	docker compose -f docker-compose.dev-local.yml up -d

.PHONY: down
down-local:
	docker compose -f docker-compose.dev-local.yml down
down-dev:
	script/down-dev.sh
down-prod:
	script/down-prod.sh

.PHONY: build
build-local:
	docker compose -f docker-compose.dev-local.yml build
build-dev:
	script/build-dev.sh
build-prod:
	script/build-prod.sh

.PHONY: restart
restart-local:
	docker compose -f docker-compose.dev-local.yml restart
restart-dev:
	docker compose -f docker-compose.dev-server-db.yml -f docker-compose.dev-server.yml restart