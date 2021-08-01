const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  extend type Query {
  topMovies: Movie
}

type Movie @key(fields: "upc") {
  upc: String!
  name: String!
  price: Int
}
`;

const resolvers = {
  Query: {
    topMovies() {
      return { upc: "one1", name: "Computer", price: "3000" }
    }
  },
  Movie: {
    __resolveReference(Movie, { fetchMovieByupc }){
      return fetchMovieByupc(Movie.upc)
    }
  }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  introspection: true
});

server.listen(4002).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});