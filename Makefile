.PHONY: install lint start kill-all deploy

install:
	npm install

lint:
	npm run lint

kill-all:
	@./scripts/kill-dev.sh

start: kill-all
	npx vite --host

deploy:
	@if [ -z "$(msg)" ]; then \
		echo "❌ Error: commit message required."; \
		echo "Usage: make deploy msg='your commit message here'"; \
		exit 1; \
	fi
	git add .
	git commit -m "$(msg)"
	git push
