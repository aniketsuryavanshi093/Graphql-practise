const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
const mongoose = require("mongoose")
const Event = require("./models/events")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/graphql" , graphqlHTTP({
    schema:buildSchema(`
        type Event{
            _id: ID!
            title: String!
            description: String!
            date: String!
            price: Float!
        }
        input EventInput{
            title: String!
            description: String!
            date: String!   
            price: Float!
        }
        type rootQuery{
            events: [Event!]!
        }
        type rootMutation{
            createEvents(eventInput: EventInput): Event
        }
        schema{
            query: rootQuery
            mutation: rootMutation
        }
    `),
    rootValue: {
        events: ()=>{
            return Event.find().then((data)=> {
                return data
            }).catch((er)=>{throw er})
        },
        createEvents:({eventInput})=> {
            const result = {
                title: eventInput.title,
                description: eventInput.description,
                date: eventInput.date,
                price: +eventInput.price
            }
            return Event.create({
                ...result
            }).then(data=>{
                console.log(data._doc);
                return data._doc
            }).catch((er)=>{throw er})
        }
    },
    graphiql: true
}))

console.log(process.env.MONGODB_SRV);
mongoose.connect(process.env.MONGODB_SRV).then(()=>{
    console.log("server started at post 3000")
    app.listen(3000)
}).catch((err)=>console.log(err))