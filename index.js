const exercsieURL = "http://localhost:3000/api/v1/exercises"

//Console log once the DOM is loaded - get a fecth request to backend rails index method
//The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading
document.addEventListener('DOMContentLoaded'), () => {
    getExercise()
}

//create a function to get the array of all exercises
function getExercise() {
    fetch(exerciseURL) //fetch return returns a promise, in the fetch request return to json 
    .then(response => response.json()) //parse response into json
    .then(exercise => {
        console.log(exercise);//get access to json data. exercise is an array of exercises
    })
}