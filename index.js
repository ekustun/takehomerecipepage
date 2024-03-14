

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const recipeName = document.getElementById('recipeInput').value.trim();
    const difficultyLevel = document.getElementById('difficultyLevel').value;
    const totalTime = document.getElementById('totalTime').value;

    let endpointURL = `https://dummyjson.com/recipes/search?q=${recipeName}`;
    
    fetch(endpointURL)
        .then(response => response.json())
        .then(data => {

            let filteredRecipes = [];
            let totalTimeToPrepare = true;

            data.recipes.forEach(recipe=> {

                const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
                let matchesDifficulty = difficultyLevel === 'Difficulty' || recipe.difficulty === difficultyLevel;

                switch(totalTime) {
                    case '15 minutes or less':
                        totalTimeToPrepare = totalTime <= 15;
                        break;
                    case '15-30 minutes':
                        totalTimeToPrepare = totalTime > 15 && totalTime <= 30;
                        break;
                    case '30 minutes or more':
                        totalTimeToPrepare = totalTime > 30;
                        break;
                    default:
                        break;
                }

                if(matchesDifficulty && totalTimeToPrepare){
                    filteredRecipes.push(recipe);
                }

            });

            displayRecipes(filteredRecipes);
        })
});

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('recipeResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    recipes.forEach((recipe, index) => {

        const recipeContainer = document.createElement('div');

        if(index === 0){
          recipeContainer.className = 'featuredRecipeContainer';
        }else{
          recipeContainer.className = 'recipeContainer';
        }
        

        recipeContainer.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipeContainer-body">
                <h5 class="recipeContainer-title">${recipe.name}</h5>
                <p class="recipeContainer-text">Difficulty Level</p>
                <p class="recipeContainer-text">${recipe.difficulty}</p>
                <p class="recipeContainer-text">${recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutes</p>
            </div>
        `;

        resultsContainer.appendChild(recipeContainer);
    });

}
