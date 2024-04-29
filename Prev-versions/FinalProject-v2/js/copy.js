class Graph {
    constructor(imgSrc, altText, name, author, detailLink) {
        this.imgSrc = imgSrc;
        this.altText = altText;
        this.name = name;
        this.author = author;
        this.detailLink = detailLink;

        this.element = null;
    }
}

const gallery = [];

function saveToLocalStorage() {
    localStorage.setItem('storedGallery', JSON.stringify(gallery));
}

function retrieveFromLocalStorage() {
    const galleryString = localStorage.getItem('storedGallery');
    if (galleryString) {
        const galleryArray = JSON.parse(galleryString);
        for (const graphData of galleryArray) {
            const graph = new Graph(graphData.imgSrc, graphData.altText, graphData.name, graphData.author, graphData.detailLink);
            gallery.push(graph);
            addToGallery(graph);
        }
    }
}

function addToGallery(graph) {
    const template = document.getElementById('my-graph');
    const clone = document.importNode(template.content, true);
    graph.element = clone.querySelector('.graph1');

    graph.element.querySelector('.graph-image').src = graph.imgSrc;
    graph.element.querySelector('.graph-image').alt = graph
}