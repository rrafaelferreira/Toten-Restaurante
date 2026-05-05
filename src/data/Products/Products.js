// src/data/Products/Products.js

// Importando as imagens com os caminhos corrigidos
import xburger from "../../assets/images/products/hamburgersimage/x-burger.jpg";
import cocacola from "../../assets/images/products/colddrinksimage/cocacola.jpg"; 
import chocolate from "../../assets/images/products/dessertsimage/chocolate.jpg";
import coffe from "../../assets/images/products/hotdrinksimage/coffe.jpg"; 

export const produtos = [
    {
        id: 1,
        name: "X-Burger",
        category: "hamburgers",
        price: 25.90,
        image: xburger
    },
    {
        id: 2,
        name: "Coca-Cola",
        category: "cold-drinks",
        price: 8.00,
        image: cocacola
    },
    {
        id: 3,
        name: "Chocolate",
        category: "desserts",
        price: 15.00,
        image: chocolate
    },
    {
        id: 4,
        name: "Café",
        category: "hot-drinks",
        price: 6.50,
        image: coffe
    }
];