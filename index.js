const exerciseURL = "http://localhost:3000/api/v1/exercises"

//Console log once the DOM is loaded - get a fecth request to backend rails index method
//The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading
document.addEventListener('DOMContentLoaded', () => {
    getExercise() //render the exercise arrays
    //fetch and load all exercises
    const createExerciseForm = document.querySelector("#create-new-exercise-form") //query the exercise form (in html)

    //After querying the form, the user will input data
    //Wait and listen for the user to submit the form
    createExerciseForm.addEventListener("submit", (e) => createFormHandler(e))
    //prevent the page from auto refreshing - create a handler to do this
    //This handler will prevent this from auto refreshing, and will post the form 

})


//create a function to get the array of all exercises
function getExercise() {
    fetch(exerciseURL) //fetch return returns a promise, in the fetch request return to json 
    .then(response => response.json()) //parse response into json
    .then(exercise => { //get the exercise ARRAY - since its an array, you need to iterate
        exercise.data.forEach(exercises => {
            // debugger; //Use debugger to type in exercise.attributes to find all the attributes
            //ensure you have a data-id to work with OOJS
            //Data Ids let you know which exercise you are making/clicking on
            //Without data id youd have to do: @exercise = Exercise.find_by(name: params[:name])
            //create a new instance of the Exercise class for every exercise in the array
        
            //const newExercise = new Exercise(exercise.id, exercises.attributes)
            
            const exerciseMarkup = `
            <div data-id=${exercises.id}> 
                <h2>${exercises.attributes.name}</h2>
                <p>${exercises.attributes.instructions}</p>
                <img src=${exercises.attributes.image} height="200" width="250"> </img>
                <h5>Category: ${exercises.attributes.category.title}</h5>
            </div>
            <br></br>`; 

            //add the new markup into the div container on html to render it 
            document.querySelector('#exercise-container').innerHTML += exerciseMarkup;
            //document.querySelector('#exercise-container').innerHTML += newExercise.renderExerciseCard();

        })//get access to json data. exercise is an array of exercises
        //render the exercises
    })
} //navigate to the index.js and view xhl to ensure this works 






function createFormHandler(e){ //handle the form inputs, prevent the default, and do something with it
    //prevent the default behavior 
    e.preventDefault()
    // debugger  //get values of inputs - query for inputs and get the value
    //document.querySelector("#class-name").value
    //document.querySelector('#exercise-name').value
    //document.querySelector('#exercise-name').value
    //document.querySelector('#exercise-image').value
    //document.querySelector('#category').value
    const exerciseName = document.querySelector('#exercise-name').value
    const exerciseInstructions = document.querySelector('#exercise-instructions').value
    const exerciseImage = document.querySelector('#exercise-image').value
    const category = document.querySelector('#categories').value //this returns a string
    const categoryId = parseInt(category) //this returns an integer
    postFetch(exerciseName, exerciseInstructions, exerciseImage, categoryId) //fetch the information from backend, tell it what to fetch 

}


function postFetch(name, instructions, image, category_id) {
    const bodyData = {name, instructions, image, category_id}
    fetch(exerciseURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(exercise => {
        console.log(exercise); //always console log so that we can see what the code looks like 
        const exerciseData = exercise.data
        const exerciseMarkup = `
        <div data-id=${exercise.id}> 
            <h2>${exerciseData.attributes.name}</h2>
            <p>${exerciseData.attributes.instructions}</p>
            <img src=${exerciseData.attributes.image} height="200" width="250"> </img>
            <h5>Category: ${exerciseData.attributes.category.title}</h5>
        </div>
        <br></br>`;
         document.querySelector('#exercise-container').innerHTML += exerciseMarkup;
        
    })
   

   

    
}
