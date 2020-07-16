run:
	deno run --allow-net --allow-read server.ts
test:
	deno test --allow-net --allow-read server.ts
format:
	deno fmt
debug:
	deno run --allow-net --allow-read -A --inspect-brk server.ts
bundle:
	rm -rf build/
	mkdir build
	deno bundle server.ts build/index