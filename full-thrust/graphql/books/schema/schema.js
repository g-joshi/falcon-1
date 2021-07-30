const graphql = require('graphql');
//const _ = require('lodash');
const Book = require('../models/book');
const { GraphQLObjectType,
GraphQLString,
GraphQLSchema,
GraphQLID,
GraphQLList,
GraphQLNonNull } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});



const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    books:{
        type: new GraphQLList(BookType),
        resolve(parent ,args){
            //return books;
            return Book.find({});
        }
      },
      book:{
        type: BookType,
        args:{id:{type: GraphQLID},test:{type:GraphQLString}},
        resolve(parent,args){
           //return _.find(books,{id: args.id});
           console.log(args,'dasdsad');
           return Book.findById(args.id);
        }
      }
  }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        
        addBook:{
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre

                });
                return book.save();
            }
        },
        editBook:{
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type:new GraphQLNonNull(GraphQLString)},
                id:{type:GraphQLString}
            },
            resolve(parent,args){
                return Book.findByIdAndUpdate(args.id, {
                    name:      args.name,
                    genre:       args.genre
            }, {new: true}, (err, Book) => {
                if (err) {
                    return console.log(err);
                }
            }); 
            }
        },
        deleteBook:{
            type: BookType,
            args:{
               id:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                return Book.findByIdAndDelete(args.id,(err)=>console.log(err)); 
            }
        }
    }

})

module.exports = new GraphQLSchema({
 query: RootQuery,
 mutation: Mutation
});