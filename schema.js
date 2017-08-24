const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const customers = [
  {id: '1', name: 'John Doe', email:'jdoe@gmail.com', age:35},
  {id: '2', name: 'Steve Smith', email:'ssmith@gmail.com', age:21},
  {id: '3', name: 'Wilma Williams', email:'wwilliams@gmail.com', age:45},
];

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields:() => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
     age: {type: GraphQLInt},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:() => ({
    customer: {
      type: CustomerType,
      args:{
        id: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        for(let i=0; i < customers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i];
          }
        }
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return customers;  
      }
    }
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
