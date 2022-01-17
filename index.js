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
            render(exercises)
        })//get access to json data. exercise is an array of exercises
        //render the exercises
    })
} //navigate to the index.js and view xhl to ensure this works 


function render(exercises) {
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

}



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
    const exerciseInstructions = document.querySelector('#exercise-name').value
    const exerciseImage = document.querySelector('#exercise-image').value
    const category = document.querySelector('#categories').value //this returns a string
    const categoryId = parseInt(document.querySelector('#categories').value) //this returns an integer
    postFetch(exerciseName, exerciseInstructions, exerciseImage, categoryId) //fetch the information from backend, tell it what to fetch 

}


//look up using fetch documentation - this is a POST. Get the information from the backend 
// function postFetch(name, instructions, image, category_id){  
//     //const bodyData = {name, instructions, image, category_id}
//     fetch(exerciseURL, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"}, // 
//         body: JSON.stringify(name, instructions, image, category_id) //body data must match content-type header
//     })
//     .then(response => response.json())
//     .then(exercise => {
//         console.log(exercise);
//         //const exerciseData = exercise.data
//         //render JSON response
//         render(exercises)
//         //add the new markup into the div container on html to render it 
//         document.querySelector('#exercise-container').innerHTML += exerciseMarkup;
//     })

// }



