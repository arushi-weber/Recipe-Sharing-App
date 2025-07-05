const express = require("express");
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

const path = require("path");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));

let recipes = [
  {
    id: uuidv4(),
    title: 'Pizza',
    description: 'Cheesy Italian pizza',
    ingredients: "Flour, Cheese, Tomato Sauce",
    steps: "1. Prepare pizza dough using flour, yeast, water, and salt. 2. Roll out the dough into a flat base. 3. Spread tomato sauce evenly on the base. 4. Sprinkle grated cheese generously. 5. Bake in a preheated oven at 220°C for 12-15 minutes until golden and bubbly."
  },
  {
    id: uuidv4(),
    title: 'Pasta',
    description: 'Creamy white sauce pasta',
    ingredients: "Pasta, Milk, Flour, Butter, Cheese",
    steps: "1. Boil pasta until al dente, then drain. 2. In a pan, melt butter and add flour to make a roux. 3. Gradually pour in milk, stirring constantly to avoid lumps. 4. Add cheese and stir until melted. 5. Mix in the boiled pasta and coat evenly. 6. Serve hot with optional herbs on top."
  },
  {
    id: uuidv4(),
    title: 'Tacos',
    description: 'Mexican-style crunchy tacos',
    ingredients: "Taco shells, Ground beef, Lettuce, Tomato, Cheese, Salsa",
    steps: "1. Cook ground beef in a skillet with seasoning until browned. 2. Chop lettuce and tomatoes. 3. Warm the taco shells slightly. 4. Fill each shell with beef, then top with lettuce, tomato, and cheese. 5. Drizzle salsa over and serve immediately."
  },
  {
    id: uuidv4(),
    title: 'Paneer Butter Masala',
    description: 'Rich Indian curry with paneer',
    ingredients: "Paneer, Tomato puree, Cream, Butter, Spices",
    steps: "1. Heat butter in a pan and sauté ginger-garlic paste. 2. Add tomato puree and cook until oil separates. 3. Add spices like garam masala, turmeric, and chili powder. 4. Stir in cream to make the gravy rich. 5. Add paneer cubes and simmer for 5 minutes. 6. Garnish with coriander and serve with naan or rice."
  },
  {
    id: uuidv4(),
    title: 'Fried Rice',
    description: 'Asian-style vegetable fried rice',
    ingredients: "Rice, Carrot, Beans, Soy Sauce, Onion, Garlic",
    steps: "1. Cook and cool rice beforehand. 2. In a wok, heat oil and sauté chopped garlic and onion. 3. Add finely chopped vegetables and stir-fry on high flame. 4. Add rice and mix well. 5. Pour soy sauce and toss everything until well combined. 6. Serve hot with a side of chili sauce."
  },
  {
    id: uuidv4(),
    title: 'Chocolate Cake',
    description: 'Moist and rich chocolate cake',
    ingredients: "Flour, Cocoa, Sugar, Eggs, Butter, Baking powder",
    steps: "1. Preheat oven to 180°C. 2. In a bowl, mix flour, cocoa, sugar, and baking powder. 3. Add eggs and melted butter. 4. Mix until smooth and lump-free. 5. Pour batter into a greased cake tin. 6. Bake for 30–35 minutes or until a toothpick comes out clean. 7. Let it cool before slicing."
  }
];



app.get("/recipes",(req,res)=>{
    res.render("index.ejs",{recipes});
});

app.get("/recipes/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/recipes",(req,res)=>{
    let { title,description,ingredients,steps } = req.body;
    let id = uuidv4();
    recipes.push({id,title,description,ingredients,steps});
    res.redirect("/recipes");
});

app.get("/recipes/:id",(req,res)=>{
    let { id } = req.params;
    let recipe = recipes.find((r)=> id === r.id);
    res.render("show.ejs",{recipe});
});

app.get("/recipes/:id/edit",(req,res)=>{
    let {id} = req.params;
    let recipe = recipes.find((r)=> id === r.id);
    res.render("edit.ejs",{recipe});
});

app.patch("/recipes/:id",(req,res)=>{
    let { id } = req.params;
    let newtitle = req.body.title;
    let newdescription =  req.body.description;
    let newingredients = req.body.ingredients;
    let newsteps = req.body.steps;
    let recipe = recipes.find((r)=> id === r.id);
    if(recipe){
    recipe.title = newtitle;
    recipe.description = newdescription;
    recipe.ingredients = newingredients; 
    recipe.steps = newsteps;
    }
    res.redirect("/recipes");
});

app.delete("/recipes/:id",(req,res)=>{
    let { id } = req.params;
    recipes = recipes.filter((r)=> id !== r.id);
    res.redirect("/recipes");
})

app.listen(port,(req,res)=>{
    console.log("Listening to the port 3000");
});