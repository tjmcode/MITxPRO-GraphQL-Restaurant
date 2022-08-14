// #region  H E A D E R
// <copyright file="index.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MIXxPRO-GraphQL-Restaurant
 *      Module:   Modules (./index.js)
 *      Project:  MIXxPRO MERN Certification
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     August 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the MicroCODE's Common JavaScript Template.
 *      This file is copied to start all MicroCODE JavaScript code files.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO - WEEK 24 - GraphQL Restaurant Data Exercise
 *
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  14-Aug-2022   TJM-MCODE  {0001}    MIT xPRO - WEEK 24 - GraphQL Restaurant Data Exercise .
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

const APP_PORT = 5500;
const NEWID_MIN = 11;
const NEWID_MAX = 1111;


// #endregion

// #region  P R I V A T E   F I E L D S

// Load ExpressJS
// CommonJS (CJS) Form: var express = require('express');
var express = require("express");

// Instantiate ExpressJS
// CommonJS (CJS) Form: var app = express();
var app = express();

// Load the Express-GraphQL connection
var {graphqlHTTP} = require("express-graphql");

// Load GraphQL
var {buildSchema, assertInputType} = require("graphql");

// Initialize a fake JSON Database of Restaurants...
var restaurants = [
    {
        id: 1,
        name: "WoodsHill ",
        description:
            "American cuisine, farm to table, with fresh produce every day",
        dishes: [
            {
                name: "Swordfish grill",
                price: 27,
            },
            {
                name: "Roasted Broccily ",
                price: 11,
            },
        ],
    },
    {
        id: 2,
        name: "Fiorellas",
        description:
            "Italian-American home cooked food with fresh pasta and sauces",
        dishes: [
            {
                name: "Flatbread",
                price: 14,
            },
            {
                name: "Carbonara",
                price: 18,
            },
            {
                name: "Spaghetti",
                price: 19,
            },
        ],
    },
    {
        id: 3,
        name: "Karma",
        description:
            "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
        dishes: [
            {
                name: "Dragon Roll",
                price: 12,
            },
            {
                name: "Pancake roll ",
                price: 11,
            },
            {
                name: "Cod cakes",
                price: 13,
            },
        ],
    },
];

// Define GraphQL SCHEMA for querying the Restaurant Database
var schema = buildSchema(`
type Query {
  restaurant(id: Int): Restaurant
  restaurants: [Restaurant]
},
type Restaurant
{
  id: Int
  name: String
  description: String
  rating: Int
  dishes:[Dish]
}
type Dish
{
  name: String
  price: Int
}
input RestaurantInput
{
  name: String
  description: String
}
type DeleteResponse
{
  ok: Boolean!
}
type Mutation
{
  setrestaurant(input: RestaurantInput): Restaurant
  deleterestaurant(id: Int!): DeleteResponse
  editrestaurant(id: Int!, rating: Int!): Restaurant
}
`);

// The root provides a resolver function for each API endpoint
var root = {

    restaurant: (arg) =>
    {
        // return information on the selected restaurant...
        return restaurants.find(obj => obj.id === arg.id);
    },

    restaurants: () =>
    {
        // return all restaurants...image.png
        return restaurants;
    },

    setrestaurant: ({input}) =>
    {
        // add a new restaurant to the 'database'...
        restaurants.push({id: getRandomInt(NEWID_MIN, NEWID_MAX), name: input.name, description: input.description});
        return restaurants.find(obj => obj.name === input.name);
    },

    deleterestaurant: ({id}) =>
    {
        // delete the data for a specific restaurant from the 'database'...
        const indexOfObject = restaurants.findIndex(object =>
        {
            return object.id === id;
        });
        restaurants.splice(indexOfObject, 1);
        return {ok: 1};
    },

    editrestaurant: ({id, rating}) =>
    {
        // update the data for a specific restaurant in the 'database'...
        const indexOfObject = restaurants.findIndex(object =>
        {
            return object.id === id;
        });
        restaurants[indexOfObject]["rating"] = rating;
        return restaurants[indexOfObject];
    },
};

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

// #endregion

// #region  M E T H O D S – P R I V A T E

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// #endregion

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

var port = APP_PORT;

app.listen(port, () => console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`));

// #region  M E T H O D - E X P O R T S

// #endregion

// #endregion
// #endregion