// src/data/Products/Products.js
// Importando as imagens com os caminhos corrigidos

// Hamburguers
import xburger from "../../assets/images/products/hamburgersimage/x-burger.jpg";
import chickenBurguer from "../../assets/images/products/hamburgersimage/chickenburger.jpg";

// Side Dishes
import batataFrita from "../../assets/images/products/sidedishesimage/frenchfries.jpg";
import nuggets from "../../assets/images/products/sidedishesimage/nuggets.jpg";

// Cold Drink
import cocacola from "../../assets/images/products/colddrinksimage/cocacola.jpg"; 
import pepsi from "../../assets/images/products/colddrinksimage/pepsi.jpg";

// Drinks
import DrinkdeLimao from "../../assets/images/products/drinksimage/lemondrink.jpg";
import DrinkdeLaranja from "../../assets/images/products/drinksimage/orangedrink.jpg";

// Dessert
import chocolate from "../../assets/images/products/dessertsimage/chocolate.jpg";
import macarons from "../../assets/images/products/dessertsimage/macarons.jpg";

// Hot Drinks
import coffe from "../../assets/images/products/hotdrinksimage/coffe.jpg";
import chocolatequente from "../../assets/images/products/hotdrinksimage/hotchocolate.jpg";

// Milk Shake
import milkshakedechocolate from "../../assets/images/products/milkshakesimage/milkshakechocolate.jpg";
import milkshakedemorango from "../../assets/images/products/milkshakesimage/milkshakemorango.jpg";
import { image } from "framer-motion/client";



export const produtos = [

    //Hamburguer
    {
        id: 1,
        name: "X-Burger",
        category: "hamburgers",
        price: 25.90,
        image: xburger
    },
    {
        id: 1.1,
        name: "Chicken-burguer",
        category: "hamburgers",
        price: 27.80,
        image: chickenBurguer
    },

    //SideDIshes
    {
        id: 2,
        name: "Batata Frita",
        category: "Sidedishes",
        price: 12.00,
        image: batataFrita
    },
    {
        id: 2.1,
        name: "Nuggets",
        category: "Sidedishes",
        price: 11.50,
        image: nuggets
    },

    //Cold Drinks
    {
        id: 3,
        name: "Coca-Cola",
        category: "cold-drinks",
        price: 8.00,
        image: cocacola
    },
    {
        id: 3.1,
        name: "Pepsi Lata",
        category: "cold-drinks",
        price: 7.00,
        image: pepsi
    },

    //Drinks
    {
        id: 4,
        name: "Drink de Limão",
        category: "drinks",
        price: 14.00,
        image: DrinkdeLimao
    },
    {
        id: 4.1,
        nome: "Drink de Laranja",
        category: "drinks",
        price: 13.00,
        image: DrinkdeLaranja
    },

    //Hot Drinks
    {
        id: 5,
        name: "Café",
        category: "hot-drinks",
        price: 6.50,
        image: coffe
    },
    {
        id: 5.1,
        name: "Chocolate Quente",
        category: "hot-drinks",
        price: 8.30,
        image: chocolatequente
    },

    //Desserts
    {
        id: 6,
        name: "Chocolate",
        category: "desserts",
        price: 15.00,
        image: chocolate
    },
    {
        id: 6.1,
        name: "Macarons",
        category: "desserts",
        price: 15.50,
        image: macarons
    },

    //Milk Shake
    {
        id: 7,
        name: "MilkShake de Morango",
        category: "milk-shakes",
        price: 18.00,
        image: milkshakedemorango
    },
    {
        id: 7.1,
        name: "MilkShake de Chocolate",
        category: "milk-shakes",
        price: 18.00,
        image: milkshakedechocolate
    },
];