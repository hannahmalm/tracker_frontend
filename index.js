const exerciseURL = "http://localhost:3000/api/v1/exercises"

// const cardList = document.querySelector('.card-group');

// const cardBody = document.querySelector('.card');

//--------------Variables for Editing form------------------------------------------------
const nameValue = document.getElementById('exercise-name'); //taken from index.html within the form 
const bodyValue = document.getElementById('exercise-instructions'); //taken from index.html within the form
const videoValue = document.getElementById('exercise-image'); //taken from index.html within the form
const categoryValue = document.getElementById('categories').selectedIndex; //taken from index.html within the form
//const categoryValue = document.querySelector('categories select option:checked');
const btnSubmit = document.querySelector('#create-exercise');
//-----------------------------------------------------------------------------------------

//Console log once the DOM is loaded - get a fecth request to backend rails index method
//The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading
//The load event fires when a resource and all its dependent resources (including CSS and JavaScript) have finished loading
//The DOMContentLoaded event is the browser's built-in way to indicate when a page's html is loaded into the DOM
//It isn't possible to manipulate HTML elements that haven't rendered yet, so trying to manipulate the DOM before the page fully loads can potentially lead to problems.
//you need to wait until the dom content is all loaded to render the form and the exercise cards
//By creating an event listener, you keep the code from immediately firing when index.js is loaded
//document.addEventListener('DOMContentLoaded', () => {     //This is how you write it in es6
//It is important to note that the DOMContentLoaded event fires once the initial HTML document finishes loading, but does not wait for CSS stylesheets or images to load.
//It may take a couple of seconds for the youtube videos to load
document.addEventListener("DOMContentLoaded", function() {
    console.log("dom loaded")
    getExercise() //render and fetch all the exercise cards within the exercise array 
    const createExerciseForm = document.querySelector("#create-new-exercise-form") //query the exercise form (in html)

    //After querying the form, the user will input data
    //Wait and listen for the user to submit the form
    createExerciseForm.addEventListener("submit", (e) => createFormHandler(e))
    //prevent the page from auto refreshing - create a handler to do this
    //This handler will prevent this from auto refreshing, and will post the form 

    document.addEventListener("dblclick", (e) => createClickHandler(e))
   
    

})

//ADD IN AN ALERT TO USER WHEN FORM IS SUBMITTED
// const input = document.getElementById('input');
// input.addEventListener('click', function(event) {
//   alert('I was clicked!');
// });

//create a function to get the array of all exercises
//fetch() is similar to XMLHttpRequest that has promises
//fetch the url bakend
//using .them allows you to chain multiple asynchronous operations to run in order, one after the other 
//fetch by default users an HTTP GET to retreive content from the URL
function getExercise() {
    fetch(exerciseURL) //fetch return returns a promise, in the fetch request return to json 
    .then(response => response.json()) //parse response into json -> this is a callback function that will run if the previous operation is successful
    .then(exercise => { //get the exercise ARRAY - since its an array, you need to iterate -> This callback receives the input of the previous callback
        exercise.data.forEach(exercises => {
            // debugger; //Use debugger to type in exercise.attributes to find all the attributes
            //ensure you have a data-id to work with OOJS
            //Data Ids let you know which exercise you are making/clicking on
            //Without data id youd have to do: @exercise = Exercise.find_by(name: params[:name])
            //create a new instance of the Exercise class for every exercise in the array
            let newExercise = new Exercise(exercises, exercises.attributes)
            
            // const exerciseHTML = `
            // <div data-id=${exercises.id}> 
            //     <h2>${exercises.attributes.name}</h2>
            //     <p>${exercises.attributes.instructions}</p>
            //     <img src=${exercises.attributes.image} height="200" width="250"> </img>
            //     <h5>Category: ${exercises.attributes.category.title}</h5>
            // </div>
            // <br></br>`; 

            //add the new HTML into the div container on html to render it 
            //document.querySelector('#exercise-container').innerHTML += exerciseHTML
            document.querySelector('#exercise-container').innerHTML += newExercise.renderExerciseCard()

        })//get access to json data. exercise is an array of exercises
        //render the exercises
    })
} //navigate to the index.js and view xhl to ensure this works 


function createClickHandler(e){
    e.preventDefault()
    let deleteButton = e.target.id == 'delete-exercise';
    let editButton = e.target.id == 'edit-exercise';
    //console.log(e.target.parentElement.parentElement.parentElement.parentElement.dataset.id)
    let id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;

    if(deleteButton){
        console.log("delete");
        fetch((`${exerciseURL}/${id}`), { method: 'DELETE' })
        .then(() => console.log('delete success'))
        .then(() => location.reload())
        
    }
    
    if(editButton){
        console.log("edit")
        const parent = e.target.parentElement.parentElement.parentElement;
        let nameContent = parent.querySelector('.card-title').textContent;
        let instructionsContent = parent.querySelector('.card-text').textContent; 
        const videoParent = e.target.parentElement.parentElement.parentElement.parentElement;
        const categoryParent = e.target.parentElement.parentElement;
        //console.log(categoryParent.querySelector('.text-muted').textContent)
        //console.log(videoParent.querySelector('#myframe').attributes.src.value)
        let videoContent = videoParent.querySelector('#myframe').attributes.src.value;
        //let categoryContent = categoryParent.querySelector('.text-muted').textContent;
        // console.log(videoContent)
        // console.log(nameContent);
        // console.log(instructionsContent);
        // console.log(videoContent);
        //console.log(categoryValue)
        nameValue.value = nameContent; //renders old content in the form
        bodyValue.value = instructionsContent; //renders old content in the form
        videoValue.value = videoContent; //renders old content in the form
        // console.log(categoryValue.value)
        // console.log(categoryValue)
        // console.log(categoryContent)
        //categoryValue.value = categoryContent; //renders old content in the form

    }
    
    //Update the existing post using PATCH method
    //Ensure that this is done on the backend within the controller and is in the routes
    btnSubmit.addEventListener('click',(e) => {
        e.preventDefault()
        console.log('updated')
        fetch((`${exerciseURL}/${id}`), { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameValue.value,
                instructions: bodyValue.value,
                image: videoValue.value,
                //category_id: categoryValue.value
            })
        })
            .then(() => console.log('edit success'))
            .then(() => location.reload())

    })
  }




function createFormHandler(e){ //handle the form inputs, prevent the default, and do something with it
    //prevent the default behavior from refreshing the page
    e.preventDefault()
    console.log("submitted")
    //alert('Your exercise was submitted. To view this exercise, scroll to the bottom of this page');
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


//fetch lets you load additional data after information is presented to the user 
//fetch() uses an HTTP POST to send content gathered through JS Object
//use HTTP POST to send content gathered in <input> elements
function postFetch(name, instructions, image, category_id) {
    const formData = {name, instructions, image, category_id}
    fetch(exerciseURL, {
        method: "POST", //Needed to tell fetch that this is a post request
        headers: {
            "Content-Type": "application/json", //metadata indicating what the format of data being sent
            "Accept": "application/json" //tell the server what data format we accept in return
        },  
        body: JSON.stringify(formData) //the actual data itself that we are sending in fetch
        //Whenever data is assigned to the body of the request it needs to be a string -> thats why you use stringify
        //this would look like: "{"name":"Bicep Curl", "instructions":"test"}"
    })
    .then(response => response.json()) //handle responses to fetch() -> server will send a response, to access this response use a .then() callback
    //This response object has a built in .json method, converting the body of the response from JSON to a JS object
    .then(() => location.reload())
    .then(exercise => { //in this callback, the js object from the response can be used
        console.log(exercise); //always console log so that we can see what the code looks like 
        const exerciseData = exercise.data
        let newExercise = new Exercise(exerciseData, exerciseData.attributes)
        document.querySelector('#exercise-container').innerHTML += newExercise.renderExerciseCard()
    

    



        // const exerciseMarkup = `
        // <div data-id=${exercise.id}> 
        //     <h2>${exerciseData.attributes.name}</h2>
        //     <p>${exerciseData.attributes.instructions}</p>
        //     <img src=${exerciseData.attributes.image} height="200" width="250"> </img>
        //     <h5>Category: ${exerciseData.attributes.category.title}</h5>
        // </div>
        // <br></br>`;
        //  document.querySelector('#exercise-container').innerHTML += exerciseMarkup;
    // .catch(function(error){
    //     alert("Oops, something went wrong");
        
    }) //catch is called when something goes wrong that allows us to handle th error
        

  
  //reset input fields to empty the form 



   

   

    
}
