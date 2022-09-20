import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import dotenv from "dotenv";
import "reflect-metadata";
import db from "./models";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
dotenv.config();

import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";

import { verify } from "jsonwebtoken";

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  try {
    await db.sequelize.sync({ force: true });
  } catch (error: any) {
    console.error(`Unable to create table : `, error);
  }

  const app = express();

  app.use(cookieParser());

  const accessTokenSecrete = process.env.ACCESS_TOKEN_SECRET;

  app.use(
    (req: { cookies: { [x: string]: any } }, _: any, next: () => void) => {
      const accessToken = req.cookies["access-token"];
      try {
        const data = verify(accessToken, accessTokenSecrete) as any;
        (req as any).userId = data.userId;
      } catch {}
      next();
    }
  );

  await server.start()

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  try {
    app.listen(PORT, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

main();
