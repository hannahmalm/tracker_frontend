const exerciseURL = "http://localhost:3000/api/v1/exercises"

//Console log once the DOM is loaded - get a fecth request to backend rails index method
//The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading
document.addEventListener('DOMContentLoaded', () => {
    getExercise() //render the exercise arrays

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
            const exerciseMarkup = `
                <div data-id=${exercises.id}> 
                    <h2>${exercises.attributes.name}</h2>
                    <p>${exercises.attributes.instructions}</p>
                    <img src=${exercises.attributes.image} height="200" width="250"> </img>
                    <h5>Category: ${exercises.attributes.category.title}</h5>
                </div>
                <br></br>`; 

                //add the new markup into the div container on html to render it 

        })//get access to json data. exercise is an array of exercises
        //render the exercises
    })
} //navigate to the index.js and view xhl to ensure this works 


function createFormHandler(e){ //handle the form inputs, prevent the default, and do something with it
    //prevent the default behavior 
    e.preventDefault()
    debugger  //get values of inputs - query for inputs and get the value
    //document.querySelector("#class-name").value
    //exercise_name = document.querySelector('#exercise-name').value
    //exercise_instructions = document.querySelector('#exercise-name').value
    //exercise_image = document.querySelector('#exercise-image').value
    //category = document.querySelector('#category').value
  
   
    //find input values by using the debugger
}


