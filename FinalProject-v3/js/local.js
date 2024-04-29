//class constructor for saving the graph to the gallery
class graph {
    constructor(name, imgSrc, altText, detailLink, author) {
        this.name = name;
        this.imgSrc = imgSrc;
        this.altText = altText;
        this.detailLink = detailLink;
        this.author = author;

        this.element = null;
    }
}

//save the gallery list to local storage
function saveToLocalStorage() {
    const graphArray = Array.from(gallery);
    const graphArrayString = JSON.stringify(graphArray);
    localStorage.setItem('storedGraphs', graphArrayString);
}
  
//retrieve the gallery list from local storage
function retrieveFromLocalStorage() {
    const graphArrayString = localStorage.getItem('storedGraphs');
    const graphArray = JSON.parse(graphArrayString);
    for (const graphData of graphArray) {
        gallery.push(graphData);
    }
}