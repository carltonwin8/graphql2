const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const axios = require('axios');
/*
const customers = [
  {id: '1', name: 'John Doe', email:'jdoe@gmail.com', age:35},
  {id: '2', name: 'Steve Smith', email:'ssmith@gmail.com', age:21},
  {id: '3', name: 'Wilma Williams', email:'wwilliams@gmail.com', age:45},
];
*/
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
        return axios.get('http://localhost:3000/customers/' + args.id).then(r => {
          if (r === {}) return {};
          console.log(r.data);
          return r.data
        }).catch(e => {console.log('error'); return {}});
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers').then(r => {
          if (r === {}) return {}
          console.log(r.data);
          return r.data
        }).catch(e => {console.log('error'); return {}});
      }
    }
  }),
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, args) {
        return axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age:  args.age
        }).then(res => res.data)
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, args) {
        console.log('delete');
        return axios.delete('http://localhost:3000/customers/' + args.id)
          .then(res => res.data);
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parentValue, args) {
        return axios.patch('http://localhost:3000/customers/' + args.id, args)
          .then(res => res.data)
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
