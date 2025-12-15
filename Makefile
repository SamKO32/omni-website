.PHONY: install lint start deploy

install:
	npm install

lint:
	npm run lint

start:
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
