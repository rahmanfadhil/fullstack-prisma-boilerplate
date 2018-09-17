import { GraphQLServer } from "graphql-yoga";
import gql from "graphql-tag";

import { Prisma } from "./generated/prisma";

const server = new GraphQLServer({
  typeDefs: gql`
    type Query {
      hello: String!
    }
  `,
  resolvers: { Query: { hello: () => "world" } },
  context: req => ({
    ...req,
    db: new Prisma({
      debug: process.env.NODE_ENV !== "production",
      endpoint: process.env.PRISMA_ENDPOINT
    })
  })
});

server.start({ port: process.env.PORT }, ({ endpoint }) => {
  console.log(`[server] listening at ${endpoint}`);
});
