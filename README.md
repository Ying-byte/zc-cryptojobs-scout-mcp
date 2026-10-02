# Crypto.jobs Scout MCP

Standard **job-search MCP** for [crypto.jobs](https://crypto.jobs).

Wraps this board’s **public API/RSS** into a standard MCP (`search_jobs` / `get_job`) so any Agent Host can use it — not only Zhencheng Nest.
Works with **any MCP Host** (Cursor, Claude Desktop / Code, Codex, Zhencheng Agent, …).

> **Publish status:** Protocol + docs + **standalone runner bundle** — no Zhencheng monorepo required at runtime.

## Quick start

```bash
cd zc-scout-channels
npm i
cd cryptojobs
node stdio_mcp_server.mjs
```

## Host config

### Cursor (`~/.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "zc-cryptojobs-scout-mcp": {
      "command": "node",
      "args": ["/ABS/PATH/zc-scout-channels/cryptojobs/stdio_mcp_server.mjs"]
    }
  }
}
```

### Claude Desktop

Same shape under `mcpServers` in Claude Desktop config.

### Zhencheng Agent

Add to external MCP allowlist as stdio:

```json
{
  "id": "cryptojobs-official",
  "name": "Crypto.jobs 搜岗",
  "transport": "stdio",
  "command": "node",
  "args": ["/ABS/PATH/zc-scout-channels/cryptojobs/stdio_mcp_server.mjs"]
}
```

## Tools

### `search_jobs`

| Arg | Type | Description |
|---|---|---|
| `query` | string | Keyword / role |
| `location` | string | Soft match (`远程`/`remote` or city/country) |
| `remoteOnly` | boolean | Prefer remote-friendly (default true) |
| `postedAfter` | string | ISO date |
| `limit` | number | 1–40 |

### `get_job`

| Arg | Type |
|---|---|
| `url` | apply/detail URL |

## Result shape

```json
{
  "title": "...",
  "company": "...",
  "location": "...",
  "applyUrl": "https://...",
  "sourceUrl": "https://...",
  "publishedAt": "2026-09-01",
  "snippet": "...",
  "salary": null,
  "remote": true,
  "source": "cryptojobs-official"
}
```

## Limits

- Read-only; no apply proxy; no site cookies in the package
- Polite rate limit ≥800ms between tool calls
- Soft location filter when the site has no geo API
- Respect robots/ToS of crypto.jobs

## Skill

See `skills/zc-cryptojobs-scout/SKILL.md` — host-neutral; points at real MCP tools `search_jobs` / `get_job`.

## License

MIT — see `LICENSE`.
