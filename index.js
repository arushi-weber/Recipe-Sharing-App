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
    steps: "Make dough, Spread sauce, Add cheese, Bake"
  },
  {
    id: uuidv4(),
    title: 'Pasta',
    description: 'Creamy white sauce pasta',
    ingredients: "Pasta, Milk, Flour, Butter, Cheese",
    steps: "Boil pasta, Prepare white sauce, Mix pasta with sauce, Serve hot"
  },
  {
    id: uuidv4(),
    title: 'Tacos',
    description: 'Mexican-style crunchy tacos',
    ingredients: "Taco shells, Ground beef, Lettuce, Tomato, Cheese, Salsa",
    steps: "Cook beef, Fill shells with beef and toppings, Add salsa"
  },
  {
    id: uuidv4(),
    title: 'Paneer Butter Masala',
    description: 'Rich Indian curry with paneer',
    ingredients: "Paneer, Tomato puree, Cream, Butter, Spices",
    steps: "Saute spices, Add tomato puree, Mix cream and paneer, Cook"
  },
  {
    id: uuidv4(),
    title: 'Fried Rice',
    description: 'Asian-style vegetable fried rice',
    ingredients: "Rice, Carrot, Beans, Soy Sauce, Onion, Garlic",
    steps: "Cook rice, Stir fry veggies, Add rice and soy sauce, Toss and serve"
  },
  {
    id: uuidv4(),
    title: 'Chocolate Cake',
    description: 'Moist and rich chocolate cake',
    ingredients: "Flour, Cocoa, Sugar, Eggs, Butter, Baking powder",
    steps: "Mix ingredients, Pour into tin, Bake, Let cool"
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