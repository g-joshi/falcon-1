const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  extend type Query {
  topUsers: User
}

type User @key(fields: "id") {
  id: String!
  name: String!
}
`;

const resolvers = {
  Query: {
    topUsers() {
      return { id: "1", name: "test", age: "30" }
    }
  },
  User: {
    __resolveReference(User, { fetchUserByupc }){
      return fetchUserByupc(User.id)
    }
  }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  introspection: true
});

server.listen(4001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});