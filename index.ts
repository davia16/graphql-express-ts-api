import express from 'express'
import { ApolloServer } from 'apollo-server-express'
const cors = require('cors')
import { typeDefs } from './src/schema'
import { resolvers } from './src/schema'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'

import { authMiddleware } from './src/middlewares/auth-middleware'
import { validateToken } from './src/utils/jwt-utils'

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express()
  const httpServer = http.createServer(app)
  app.use(cors())
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => {
      if (!req.body.operationName.toLowerCase().match('login')) {
        if (req.headers && req.headers.authorization) {
          const auth = req.headers.authorization
          const parts = auth.split(' ')
          const bearer = parts[0]
          const token = parts[1]
          if (bearer == 'Bearer') {
            const user = validateToken(token)
            if (user.error) {
              throw Error(user.msg)
            } else {
              return { user }
            }
          } else {
            throw Error('Authentication must use Bearer.')
          }
        } else {
          throw Error('User must be authenticated.')
        }
      }
    },
  }) as any
  await server.start()
  app.use('*', authMiddleware)
  server.applyMiddleware({ app })

  await new Promise<void>(
    (resolve) => httpServer.listen({ port: 4000 }, resolve), //run the server on port 4000
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
