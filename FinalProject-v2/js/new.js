// Graphs objects for the Daily section of history and today examples
const Graphs = {
    "Diagram of The Causes of Mortality in The Army in The East": {
        index: 1,
        imgSrc: "Daily/Daily-1.jpg",
        altText: "A Rose Diagram of The Causes of Mortality in The Army in The East",
        detailLink: "https://edspace.american.edu/visualwar/nightingale/",
        author: "Florence Nightingale"
    },
    "Flow Map of Napoleon's Invasion of Russia": {
        index: 2,
        imgSrc: "Daily/Daily-2.jpg",
        altText: "A Flow Map of Napoleon's Invasion of Russia",
        detailLink: "https://ageofrevolution.org/200-object/flow-map-of-napoleons-invasion-of-russia/",
        author: "Charles Joseph Minard"
    },
    "1854 Broad Street Cholera Outbreak Map": {
        index: 3,
        imgSrc: "Daily/Daily-3.jpg",
        altText: "1854 Broad Street Cholera Outbreak Map",
        detailLink: "https://education.nationalgeographic.org/resource/mapping-a-london-epidemic/",
        author: "John Snow"
    },
    "A New Chart of History": {
        index: 4,
        imgSrc: "Daily/Daily-4.jpg",
        altText: "A New Chart of History",
        detailLink: "https://en.wikipedia.org/wiki/A_New_Chart_of_History",
        author: "Joseph Priestley"
    },
    "Interactive Government Budget": {
        index: 5,
        imgSrc: "Daily/Daily-5.jpg",
        altText: "An Interactive chart of Government Budget",
        detailLink: "https://obamawhitehouse.archives.gov/interactive-budget",
        author: "US Office of Management and Budget (2016)"
    },
};




window.onload = function() {
    updateDailyGraph();
    document.getElementById('addToGalleryButton').addEventListener('click', addToGallery);
};

function updateDailyGraph() {
    const graphKeys = Object.keys(Graphs);
    let lastIndex = parseInt(localStorage.getItem('lastGraphIndex'), 10) || -1;
    let currentIndex = (lastIndex + 1) % graphKeys.length; // 'let' used because currentIndex will be recalculated every time the function runs
    localStorage.setItem('lastGraphIndex', currentIndex);

    const selectedGraph = Graphs[graphKeys[currentIndex]];
    const imageElement = document.getElementById('dailyGraphImage');
    const descriptionElement = document.getElementById('graphDescription');
    const linkElement = document.getElementById('learnMoreLink');
    const authorElement = document.querySelector('.author');

    imageElement.src = selectedGraph.imgSrc;
    imageElement.alt = selectedGraph.altText;
    linkElement.href = selectedGraph.detailLink;
    descriptionElement.textContent = graphKeys[currentIndex];
    authorElement.textContent = "Visualization by: " + selectedGraph.author;
}

function addToGallery() {
    const currentIndex = parseInt(localStorage.getItem('lastGraphIndex'), 10); // 'let' not needed as this value does not change after assignment here
    const selectedGraph = Graphs[Object.keys(Graphs)[currentIndex]];
    let gallery = JSON.parse(localStorage.getItem('gallery')) || []; // 'let' used as gallery could be updated in this function

    if (!gallery.some(graph => graph.imgSrc === selectedGraph.imgSrc)) {
        gallery.push(selectedGraph);
        localStorage.setItem('gallery', JSON.stringify(gallery));
        alert('Added to gallery!');
    } else {
        alert('This graph is already in the gallery.');
    }
}



function displayGallery() {
    var gallery = JSON.parse(localStorage.getItem('gallery')) || [];
    var galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = '';

    gallery.forEach((graph, index) => {
        var img = document.createElement('img');
        img.src = graph.imgSrc;
        img.alt = graph.altText;
        img.classList.add('gallery-img');

        var graphNameDiv = document.createElement('div');
        var graphName = document.createElement('p');
        graphName.textContent = graph.altText;
        graphName.classList.add('gallery-graph-name');
        graphNameDiv.appendChild(graphName);

        var authorDiv = document.createElement('div');
        var author = document.createElement('p');
        author.textContent = "Visualization by: " + graph.author;
        author.classList.add('gallery-author');
        authorDiv.appendChild(author);

        var linkDiv = document.createElement('div');
        var link = document.createElement('a');
        link.href = graph.detailLink;
        link.textContent = 'Learn More';
        link.classList.add('gallery-detail-link');
        link.target = '_blank';
        linkDiv.appendChild(link);

        var removeLink = document.createElement('a');
        removeLink.textContent = 'Remove';
        removeLink.classList.add('remove-detail-link');
        removeLink.href = '#';
        removeLink.onclick = function() { removeGraph(index); };
        linkDiv.appendChild(removeLink);

        var infoDiv = document.createElement('div');
        infoDiv.classList.add('gallery-info');
        infoDiv.appendChild(graphNameDiv);
        infoDiv.appendChild(authorDiv);
        infoDiv.appendChild(linkDiv);

        var div = document.createElement('div');
        div.classList.add('gallery-item');
        div.appendChild(img);
        div.appendChild(infoDiv);

        galleryContainer.appendChild(div);
    });
}

function removeGraph(index) {
    var gallery = JSON.parse(localStorage.getItem('gallery')) || [];
    gallery.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('gallery', JSON.stringify(gallery)); // Update local storage
    displayGallery(); // Redisplay the gallery
}


// Call displayGallery if we're on the gallery page
if (window.location.href.indexOf('gallery.html') > -1) {
    displayGallery();
}

