const gallery = []

//retrieve the items in the local storage
if (localStorage.getItem('storedGraphs') != null) {
    retrieveFromLocalStorage();
}
console.log(gallery);
//add all objects in the gallery to the gallery page
for (const graph of gallery) {
    addToGallery(graph);
}
//add roll to the cart page
function addToGallery(graph) {
    // Clone the template
    const template = document.querySelector('#my-graph');
    const clone = template.content.cloneNode(true);
    graph.element = clone.querySelector('.gallery-item');
    //remove the graph
    const btnDelete = graph.element.querySelector('.remove-button');
    btnDelete.addEventListener('click', () => {
        deleteGraph(graph);
    });
    //append each clones to the gallery page
    const galleryListElement = document.querySelector('#galleryContainer');
    galleryListElement.prepend(graph.element);
    //update the elements in the template for the graph
    updateElement(graph);
}

//update elements in the template for each graph
function updateElement(graph){
    graph.element.querySelector('.gallery-img').src = graph.imgSrc; 
    graph.element.querySelector('.gallery-img').alt = graph.altText; 
    graph.element.querySelector('.gallery-graph-name').textContent = graph.name;
    graph.element.querySelector('.gallery-author').textContent = graph.author;
    graph.element.querySelector('.gallery-detail-link').href = graph.detailLink;
}


//remove the graph
function deleteGraph(graph) {
    //remove the graph from graph page
    graph.element.remove();
    //remove the graph from gallery list
    let index = gallery.indexOf(graph);
    gallery.splice(index, 1);
    saveToLocalStorage();
}
