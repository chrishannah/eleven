.PHONY: editor dev dev-attach dev-stop

editor:
	@cd blog-editor && [ -d node_modules ] || npm install
	@(sleep 2 && open http://localhost:3000) &
	@cd blog-editor && npm run dev

# Launch blog + editor in a detached tmux session.
# Caddy runs as a launchd daemon already (sudo brew services start caddy).
# Attach with `make dev-attach`, stop with `make dev-stop`.
dev:
	@tmux has-session -t dev 2>/dev/null && { echo "tmux session 'dev' already exists. Use 'make dev-attach' or 'make dev-stop'."; exit 1; } || true
	@tmux new-session -d -s dev -n blog -c $(CURDIR) \; \
		send-keys 'npm run dev' Enter \; \
		new-window -n edit -c $(CURDIR)/blog-editor \; \
		send-keys 'npm run dev' Enter
	@echo "Started tmux session 'dev'."
	@echo "  Attach:  make dev-attach"
	@echo "  Stop:    make dev-stop"

dev-attach:
	@tmux attach -t dev

dev-stop:
	@tmux kill-session -t dev 2>/dev/null && echo "Stopped tmux session 'dev'." || echo "No tmux session 'dev' running."
