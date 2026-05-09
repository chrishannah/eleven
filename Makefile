.PHONY: editor

editor:
	@cd blog-editor && [ -d node_modules ] || npm install
	@(sleep 2 && open http://localhost:3000) &
	@cd blog-editor && npm run dev
