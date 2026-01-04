//ÉTAPE 1 : Données de base 🌿

//Déclare un tableau ingredients contenant des chaînes (ex. ["mandrake", "slime", "stardust", "mushroom"]).
const ingredients = ["mandrake", "slime", "stardust", "mushroom"];

//Déclare un tableau stock de mêmes longueur et ordre, contenant les quantités (nombres entiers) en magasin.
const stock = [5, 2, 8, 10];

//Crée une fonction getQty(name) qui retourne la quantité en stock de l’ingrédient name (ou 0 s’il n’existe pas).
function getQty(name) {
    for (let i=0; i<ingredients.length; i++ ) {
        if (ingredients[i] === name) {
            return stock[i];
        }
    }
    return 0;
}

//TEST ÉTAPE 1
/* console.log(getQty("mandrake"));
console.log(getQty("spidereye")); */

//ÉTAPE 2 : Réassort 🧺

/* Crée une fonction `restock(name, qty)` qui :
    - augmente le stock si l’ingrédient existe ;
    - ajoute l’ingrédient et sa quantité s’il n’existe pas encore ;
    - ignore les quantités négatives (ne rien faire si `qty < 0`). */

function restock(name, qty) {
    if (qty < 0) {
        return;
    }

    for (let i=0; i<ingredients.length; i++) {
        if (ingredients[i] === name) {
            stock[i] = stock[i] + qty;
            return;
        }
    }
    ingredients.push(name);
    stock.push(qty);
}

//TEST ÉTAPE 2

/* console.log("Before:");
console.log(ingredients);
console.log(stock);

restock("mandrake", 2);
restock("slime", 1);
restock("spidereye", 3);

console.log("\nAfter:");
console.log(ingredients);
console.log(stock); */

/* ÉTAPE 3 : Recettes de potions 🧉

    - Déclare un objet `recipes` où chaque clé est un nom de potion et la valeur est un tableau d’ingrédients requis.Ex. : `{ heal: ["mushroom", "stardust"], sticky: ["slime", "slime", "mushroom"] }`
    - Crée une fonction `canBrew(potionName)` qui retourne `true` si la boutique possède assez d’ingrédients pour fabriquer 1 potion (en comptant les doublons), sinon `false`.
    - Crée une fonction `brew(potionName)` qui :
        - retire les ingrédients du stock si c’est possible,
        - retourne `true` si la potion a été préparée, sinon `false`. */

//ÉTAPE 3 : Recettes de potions 🧉

const recipes = {
    heal: ["mushroom", "stardust"],
    sticky: ["slime", "slime", "mushroom"],
    fire: ["stardust", "mandrake"],
    poison: ["mushroom", "slime"]
};

function canBrew(potionName) {
    if (!recipes[potionName]) {
        return false;
    }
    
    const recipe = recipes[potionName];
    
    for (let i = 0; i < recipe.length; i++) {
        const ingredient = recipe[i];
        
        let needed = 0;
        for (let j = 0; j < recipe.length; j++) {
            if (recipe[j] === ingredient) {
                needed++;
            }
        }
        
        const available = getQty(ingredient);
        if (available < needed) {
            return false;
        }
    }
    
    return true;
}

function brew(potionName) {
    if (!canBrew(potionName)) {
        return false;
    }
    
    const recipe = recipes[potionName];
    
    for (let i = 0; i < recipe.length; i++) {
        const ingredient = recipe[i];
        
        for (let j = 0; j < ingredients.length; j++) {
            if (ingredients[j] === ingredient) {
                stock[j] = stock[j]--;
                break;
            }
        }
    }
    
    return true;
}

// TEST ÉTAPE 3
/* console.log("Stock initial:");
console.log(ingredients);
console.log(stock);

console.log("\nPeut-on fabriquer 'heal'?", canBrew("heal"));
console.log("Peut-on fabriquer 'sticky'?", canBrew("sticky"));

console.log("\nFabrication de 'heal':", brew("heal"));

console.log("\nStock après fabrication:");
console.log(ingredients);
console.log(stock);

console.log("\nPeut-on encore fabriquer 'heal'?", canBrew("heal")); */

// ÉTAPE 4 : Gestion de commandes 📦
    /* - Crée une fonction `processOrder(order)` où `order` est un tableau de noms de potions (ex. `["heal", "heal", "sticky"]`).
        - La fonction doit tenter de fabriquer les potions *dans l’ordre*.
        - Retourne un objet avec :
            - `done` : le nombre de potions préparées,
            - `remaining` : le nombre de potions non fabriquées faute d’ingrédients,
            - `missing` : un tableau (sans doublons) des ingrédients manquants rencontrés. */


function processOrder(order) {
    let done = 0;
    let remaining = 0;
    let missing = [];
    
    for (let i = 0; i < order.length; i++) {
        const potionName = order[i];
        
        if (brew(potionName)) {
            done++;
        } else {
            remaining++;
            
            if (recipes[potionName]) {
                const recipe = recipes[potionName];
                
                for (let j = 0; j < recipe.length; j++) {
                    const ingredient = recipe[j];
                    
                    let needed = 0;
                    for (let k = 0; k < recipe.length; k++) {
                        if (recipe[k] === ingredient) {
                            needed++;
                        }
                    }
                    
                    const available = getQty(ingredient);
                    if (available < needed) {
                        let alreadyInMissing = false;
                        for (let m = 0; m < missing.length; m++) {
                            if (missing[m] === ingredient) {
                                alreadyInMissing = true;
                                break;
                            }
                        }
                        if (!alreadyInMissing) {
                            missing.push(ingredient);
                        }
                    }
                }
            }
        }
    }
    
    return {
        done: done,
        remaining: remaining,
        missing: missing
    };
}

// TESTS ÉTAPE 4
/* console.log("Stock avant commande:");
console.log(ingredients);
console.log(stock);

const result = processOrder(["heal", "heal", "sticky", "fire"]);

console.log("\nRésultat de la commande:");
console.log(result);

console.log("\nStock après commande:");
console.log(ingredients);
console.log(stock); */

//ÉTAPE 5 : Mini-analytics 📊
/* - Crée une fonction `topNeededIngredients(orders)` où `orders` est un tableau de commandes (ex. `[["heal"], ["sticky","heal"]]`).
    - Calcule combien de fois chaque ingrédient est requis par l’ensemble des commandes.
    - Retourne un tableau `["ingredient", count]` pour l’ingrédient le plus demandé (en cas d’égalité, n’importe lequel des ex aequo). */

function topNeededIngredients(orders) {
    const ingredientCount = {};
    
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        
        for (let j = 0; j < order.length; j++) {
            const potionName = order[j];
            
            if (recipes[potionName]) {
                const recipe = recipes[potionName];
                
                for (let k = 0; k < recipe.length; k++) {
                    const ingredient = recipe[k];
                    
                    if (ingredientCount[ingredient] === undefined) {
                        ingredientCount[ingredient] = 0;
                    }
                    
                    ingredientCount[ingredient]++;
                }
            }
        }
    }
    
    let topIngredient = null;
    let maxCount = 0;
    
    for (let ingredient in ingredientCount) {
        if (ingredientCount[ingredient] > maxCount) {
            maxCount = ingredientCount[ingredient];
            topIngredient = ingredient;
        }
    }
    
    if (topIngredient === null) {
        return null;
    }
    
    return [topIngredient, maxCount];
}

// TESTS ÉTAPE 5
const orders1 = [["heal"], ["sticky", "heal"]];
console.log("Commandes:", orders1);
console.log("Ingrédient le plus demandé:", topNeededIngredients(orders1));

const orders2 = [["heal", "heal"], ["fire", "sticky"]];
console.log("\nCommandes:", orders2);
console.log("Ingrédient le plus demandé:", topNeededIngredients(orders2));

const orders3 = [["sticky", "sticky", "sticky"]];
console.log("\nCommandes:", orders3);
console.log("Ingrédient le plus demandé:", topNeededIngredients(orders3));