import { createSchema } from "graphql-yoga";
import { People } from "./database";

const typeDefinitions = /* GraphQL */ `
  type Query {
    People: [PeopleObject]!
    Greeting: String
  }
  type PeopleObject {
    id: ID
    first: String!
    last: String!
  }
  type Mutation {
    createPerson(first: String!, last: String!): PeopleObject
    deletePerson(id: ID!): PeopleObject
  }
`;

const resolvers = {
  Query: {
    People: () => People.find({}),
  },
  Mutation: {
    createPerson: async (
      parent: unknown,
      args: { first: string; last: string }
    ) => {
      const newPerson = new People({
        first: args.first,
        last: args.last,
      });
      const error = await newPerson.save();

      if (error) return error;
      return newPerson;
    },
    deletePerson: (parent: unknown, args: { id: string }) => {
      return new Promise((resolve, reject) => {
        People.findOneAndDelete(
          { _id: args.id },
          function (err: Error, result: typeof People | null) {
            if (err) return err;
            resolve(result);
          }
        );
      });
    },
  },
};

export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
