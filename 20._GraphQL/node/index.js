import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";

//const typeDefs = fs.readFileSync('./graphql/schema.graphql', 'utf8');
const typeDefs = fs.readFileSync("./graphql/fastQLSchema.graphql", "utf8");

//Defines the shape of the data that can be fetched and modified using GraphQL.
const pokemons = [
	{
		id: 1,
		name: "Bulbasaur",
		type: "Grass",
		evolves: true,
	},
	{
		id: 2,
		name: "Ivysaur",
		type: "Grass",
		evolves: true,
	},
	{
		id: 3,
		name: "Venusaur",
		type: "Grass",
		evolves: false,
	},
];

const blogs = [
	{
		id: 1,
		ownerId: 101,
		title: "First Blog",
		description: "This is my first blog",
		completed: false,
	},
];

//Defines the set of functions that are available for execution by the GraphQL API.
//Pokemon
/* const resolvers = {
    Query: {
        pokemons: () => pokemons,
        pokemon: (parent, args, contextValue, info) => { 
            return pokemons.find((pokemon) => pokemon.id === args.id)
        },
    },
}; */

const resolvers = {
	Query: {
		blogs: () => blogs,
		blog: (parent, args, contextValue, info) => {
			const blog = blogs.find((blog) => blog.id === Number(args.blogId));
			if (!blog) {
				return { errors: ["Blog not found"], blog: null };
			}
			return { blog };
		},
	},
};

//Creates an instance of ApolloServer that is ready to be started and carry out its operations.
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});
console.log(`🚀 Server ready at ${url}`);
