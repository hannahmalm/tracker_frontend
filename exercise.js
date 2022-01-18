//exercise class file  - ensure this is linked console.log("test"); 
//create a constructor that pushes all instances of this into an empty array
//Why do we want this class? If you want to create an edit function or patch request, and then render an edit form, you need to know what object youre clicking on
//Without OOJS, you have to re-find the object, and then update it
//In OOJS, you have an array of JS instances. 
//You need a place to store ids in the HTML elements to determine which exercise gets clicked and show more information about the exercise
// ENSURE YOU ARE PUTTING data-ids on all divs when rendering 
//Why push it in the array? You do an initial get fetch to get all exercises, so put them in an array and store them
//https://www.youtube.com/watch?v=HboT8g_QSGc


class Exercise {


    //function that constructs/creats a new object (exercise object) -> You could call var newExercise = new Exercise();
    //pass the constructor the arguments of what you want each Exercise to have
    constructor(exercise, exercisesAttributes) {
        this.id = exercise.id 
        this.name = exercisesAttributes.name;
        this.instructions = exercisesAttributes.instructions;
        this.image = exercisesAttributes.image;
        this.category_id = exercisesAttributes.category_id;
        Exercise.call.push(this)

    }
}

var squat = new Exercise("squat", "Instructions for squat", "image", "3")

console.log(squat); 

//the new Keyword - You could call var newExercise = new Exercise(HammerCurl, Instructions for it, image for it);
    //creates a new empty object
    // sets the value of "this" to be a new empty object
    // calls the constructor method
    //this = the new object that was created
    //you can call properities on this; like this.email 
