
const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:4001/' },
   { name: 'movies', url: 'http://localhost:4002/' }
  ],
});

const server = new ApolloServer({ gateway, subscriptions: false });
server.listen(4004,(url)=> console.log('gateway is now listenning',url));
