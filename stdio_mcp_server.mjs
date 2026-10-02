#!/usr/bin/env node
import { createChannelMcp } from './_shared/create-channel-mcp.mjs';

const mcp = createChannelMcp({
  slug: "cryptojobs",
  boardId: "cryptojobs-official",
  domain: "crypto.jobs",
  npmName: "zc-cryptojobs-scout-mcp",
});

mcp.start().catch((e) => {
  console.error(e);
  process.exit(1);
});
