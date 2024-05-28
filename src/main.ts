import "dotenv/config";

import { createServer } from "node:http";
import mongoose from "mongoose";
import { createYoga } from "graphql-yoga";

import { schema } from "./schema";

async function main() {
  const yoga = createYoga({ schema });
  const server = createServer(yoga);

  await mongoose.connect(process.env.MONGO_URL!);

  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
