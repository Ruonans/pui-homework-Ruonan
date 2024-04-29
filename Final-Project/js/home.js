// Graphs objects for the Daily section of history an today examples
const Graphs = {
    "Diagram of The Causes of Mortality in The Army in The East": {
        imgSrc: "assets/Daily/Daily-1.jpg",
        altText: "A Rose Diagram of The Causes of Mortality in The Army in The East",
        detailLink: "https://edspace.american.edu/visualwar/nightingale/",
        author: "Florence Nightingale"
    },
    "Flow Map of Napoleon's Invasion of Russia": {
        imgSrc: "assets/Daily/Daily-2.jpg",
        altText: "A Flow Map of Napoleon's Invasion of Russia",
        detailLink: "https://ageofrevolution.org/200-object/flow-map-of-napoleons-invasion-of-russia/",
        author: "Charles Joseph Minard"
    },
    "1854 Broad Street Cholera Outbreak Map": {
        imgSrc: "assets/Daily/Daily-3.jpg",
        altText: "1854 Broad Street Cholera Outbreak Map",
        detailLink: "https://education.nationalgeographic.org/resource/mapping-a-london-epidemic/",
        author: "John Snow"
    },
    "A New Chart of History": {
        imgSrc: "assets/Daily/Daily-4.jpg",
        altText: "A New Chart of History",
        detailLink: "https://en.wikipedia.org/wiki/A_New_Chart_of_History",
        author: "Joseph Priestley"
    },
    "Interactive Government Budget": {
        imgSrc: "assets/Daily/Daily-5.jpg",
        altText: "An Interactive chart of Government Budget",
        detailLink: "https://obamawhitehouse.archives.gov/interactive-budget",
        author: "US Office of Management and Budget (2016)"
    },
};


// Get an array of keys from the Graphs object
let graphKeys = Object.keys(Graphs);

let currentIndex = 0;

// update the current index 
if (localStorage.getItem('storedIndex') !== null) {
    currentIndex = retrieveIndex();
}

//get the current example
let graphName = graphKeys[currentIndex];
let chosenGraph = Graphs[graphName];
let graphImg = chosenGraph.imgSrc;
let graphAlt = chosenGraph.altText;
let graphLink = chosenGraph.detailLink;
let graphAuthor = chosenGraph.author;

// This function retrive the index from localstorage and add 1 to make sure 
// each time the graph shown is different (iterating the array)
function retrieveIndex() {
    const indexStr = localStorage.getItem('storedIndex');
    let currentIndex = JSON.parse(indexStr);
    if (currentIndex === null) {
        currentIndex = 0; // Set to 0 if no stored index
    } else if (currentIndex === graphKeys.length - 1) {
        currentIndex = 0; // Reset index to 0 if it reaches the end
    } else {
        currentIndex += 1;
    }
    return currentIndex;
}


//update all content in HTML for currentIndex item
function setAttributes() {
    let imageElement = document.getElementById('dailyGraphImage');
    let descriptionElement = document.getElementById('graphDescription');
    let linkElement = document.getElementById('learnMoreLink');
    let authorElement = document.querySelector('.author');

    imageElement.src = graphImg;
    imageElement.alt = graphAlt;
    linkElement.href = graphLink;
    descriptionElement.textContent = graphName;
    authorElement.textContent = "Visualization by: " + graphAuthor;
}

setAttributes();

// use localstorage to store the currentIndex
function storeIndex() {
    const indexStr = JSON.stringify(currentIndex);
    localStorage.setItem('storedIndex', indexStr);
}

storeIndex();


//The functions of adding the examples to the gallery

//Create an empty list for saving the graphs for gallery
const gallery = [];

//update the current gallery list
if (localStorage.getItem('storedGraphs') != null) {
    retrieveFromLocalStorage();
} 

//Check if some graph was already added into the gallery (avoid repetitions)
function testExistence(name){
    for (item of gallery) {
        return (item.name === name);
    }
}

//Add a new graph to the gallery by clicking the add to gallery button
function addNewGraph(){
    const newgraph = new graph(graphName, graphImg, graphAlt, graphLink, graphAuthor);
    if (testExistence(graphName)){
        alert("This graph is already in the gallery!");
    }
    else{
        gallery.push(newgraph);
        saveToLocalStorage();
        alert("Successfully added to the gallery!");
    }
}








