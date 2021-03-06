//exercise class file  - ensure this is linked console.log("test"); 
//create a constructor that pushes all instances of this into an empty array
//Why do we want this class? If you want to create an edit function or patch request, and then render an edit form, you need to know what object youre clicking on
//Without OOJS, you have to re-find the object, and then update it
//In OOJS, you have an array of JS instances. 
//You need a place to store ids in the HTML elements to determine which exercise gets clicked and show more information about the exercise
// ENSURE YOU ARE PUTTING data-ids on all divs when rendering 
//Why push it in the array? You do an initial get fetch to get all exercises, so put them in an array and store them
//https://www.youtube.com/watch?v=HboT8g_QSGc
//NO functions in classes
//Classes are like blueprints that have specific properties
//Object orientation allows to write code that structurally establishes the relationshops between data and functions
// object = Exercise -> create a new instnace for each exercise


class Exercise {


    //function that constructs/creats a new object (exercise object) -> You could call var newExercise = new Exercise();
    //pass the constructor the arguments of what you want each Exercise to have
    constructor(exercise, exercisesAttributes) { // Correlattes with -> const newExercise = new Exercise(exercises, exercises.attributes)
        this.id = exercise.id 
        this.name = exercisesAttributes.name //instance property
        this.instructions = exercisesAttributes.instructions //same as exercise.attributes.instructions
        this.image = exercisesAttributes.image
        this.category = exercisesAttributes.category
        Exercise.all.push(this) // push each new instance of this into array
        console.log(this);
    }

   

        


    //rendering html should be within the class 
    //do not have to specify .attributes because its givin within params above
    // renderExerciseCard() {
    
    //     return `
    //     <div data-id=${this.id}> 
    //         <h2>${this.name}</h2>
    //         <p>${this.instructions}</p>
    //         <img src=${this.image} height="200" width="250"> </img>
    //        <h2>${this.category.title}</h2>
    //     </div>
    //     <br></br>`;
    // }  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 ">

    renderExerciseCard(){
        return `
                <div class="card" data-id=${this.id}>
                    <iframe id="myframe" width="1114" height="500" 
                        src=${this.image}>
                    </iframe>
                    <div class="card-body" >
                    <h3 class="card-title">${this.name}</h3>
                    <p class="card-text">${this.instructions}</p>
                    <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">${this.category.title}</small>
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary1" id="edit-exercise">Edit</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary2" id="delete-exercise">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <br>
       `
    }

    
   
}






Exercise.all = [];

// var squat = new Exercise("squat", "Instructions for squat", "image", "3")

// console.log(squat); 

//the new Keyword - You could call var newExercise = new Exercise(HammerCurl, Instructions for it, image for it);
    //creates a new empty object
    // sets the value of "this" to be a new empty object
    // calls the constructor method
    //this = the new object that was created
    //you can call properities on this; like this.email 
