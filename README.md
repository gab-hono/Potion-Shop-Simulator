# 🧪 Potion Shop Simulator

A JavaScript exercise simulating a magical potion shop's inventory and order management system. This project was developed as part of my initial training as a Full Stack Web Developer.

## 📋 Overview

This exercise implements a complete potion shop management system where ingredients are tracked, potions are brewed according to recipes, and customer orders are processed. The shop manages stock levels, validates ingredient availability, and provides analytics on ingredient demand.

## 🎯 Core Concepts Practiced

- **Arrays & Array Methods**: Managing parallel arrays for ingredients and stock quantities, using `push()`, array iteration, and index-based operations
- **Objects & Object Properties**: Working with recipe objects using key-value pairs and dynamic property access
- **Functions**: Creating reusable functions with parameters and return values
- **Control Flow**: Implementing `if/else` statements, `for` loops, and conditional logic
- **Data Validation**: Checking ingredient availability, validating quantities, and handling edge cases
- **Algorithm Design**: Counting occurrences, finding duplicates, and tracking missing items
- **State Management**: Modifying global arrays to reflect inventory changes after brewing potions

## 🧩 Features Implemented

### Stage 1: Basic Inventory
- Initialize ingredient and stock arrays
- Query ingredient quantities with `getQty()`

### Stage 2: Restocking
- Add new ingredients to inventory
- Increase stock of existing ingredients
- Validate quantity inputs (ignore negative values)

### Stage 3: Potion Recipes
- Define potion recipes as ingredient lists
- Check if potions can be brewed with `canBrew()`
- Brew potions and deduct ingredients from stock with `brew()`

### Stage 4: Order Processing
- Process multiple potion orders sequentially
- Track successfully brewed potions vs. failed attempts
- Identify missing ingredients without duplicates

### Stage 5: Analytics
- Analyze ingredient demand across multiple orders
- Calculate ingredient frequency
- Identify the most requested ingredient

## 🛠️ Technologies

- Vanilla JavaScript (ES6+)
- No external libraries or frameworks

## 💡 Learning Outcomes

This exercise reinforced my understanding of fundamental JavaScript concepts including data structures, algorithmic thinking, and building practical applications from scratch. It demonstrates my ability to break down complex problems into manageable functions and handle real-world scenarios like inventory management and order fulfillment.
