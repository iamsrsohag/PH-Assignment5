//Search Function to Fetch API
function searchFood(){
    var foodName = document.getElementById('foodSearch');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName.value}`
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        displayFood(data.meals);
    })
}
//Food List Display
function displayFood(foods){
    const notFound = document.getElementById('noFood');
    const foodShow = document.getElementById('foodShow');
    if(!foods){
        notFound.innerHTML =`<h2>Sorry No Meals Found! Try Again</h2><br>
        <img class = "notFoundImg" src="img/404.jpg">
        `
        foodShow.innerHTML = "";
    }
    else{
        foodShow.innerHTML = "";
        notFound.innerHTML = "";
        for (const food in foods) {
            // console.log(foods[food].strMeal);
            let Meals = foods[food];
            const foodShow = document.getElementById('foodShow');
            const foodInfo = `
                    <img src="${Meals.strMealThumb}" alt="${Meals.strMeal}">
                        <h3 class="food-name">${Meals.strMeal}</h3>
                        `;
                    const div = document.createElement('div'); 
                    div.addEventListener('click', () =>{
                        displayMealsDetail(Meals.idMeal);
                    })
                    div.className = 'meal-items';
                    div.innerHTML = foodInfo;
                    foodShow.appendChild(div);
          }
    }
}
//Displaying the ingredients
function displayMealsDetail(mealID){
    const foodID = mealID;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        //strIngredient1: "Lentils"
        //strMeasure1: "1 cup 
        //strMealThumb: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
       // let ingredientsQty = data.meals[0].strMeasure;
       const foodDetails = document.getElementById('foodDetails');
       const div = document.createElement('div');
       div.className = 'mealIngredients';
       div.innerHTML = `
            <div class="mealImg">
                <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
            </div>
            <div class="mealDetails">
                <h2 class="mealTitle">${data.meals[0].strMeal}</h2>
                <h3 class="ingreadientTitle">Ingredients</h3>
                <ul id="ingredientsItem"></ul>
            </div>
           `
           foodDetails.innerHTML = '';
           foodDetails.appendChild(div);
           const ingredientsList = document.getElementById('ingredientsItem');
        //Counting Ingredients till 20
       for(let i=1;i<=20;i++){
        if(data.meals[0]['strIngredient'+i]){
            const ingredient = document.createElement('li');
            let ingredientsQty = data.meals[0]['strMeasure'+i];
            let ingredientsName = data.meals[0]['strIngredient'+i];
            // console.log(ingredientsQty);
            ingredient.innerText = ingredientsQty + ' ' + ingredientsName;
            ingredientsList.appendChild(ingredient);
        }
        // console.log(ingredientsQty);
       }
        // console.log(data.meals[0].strIngredient1);   
    })
}