//Create the interactions of tags in variable exploration section
//Each variable name and its corresponding defintion
const var_def = {
    "company_location" : "Manufacturer region",
    "specific_bean_origin_or_bar_name": "Specific bean or bar name",
    "company_manufacturer": "Manufacturer name",
    "cocoa_percent": "Cocoa percent (% chocolate)",
    "country_of_bean_origin": "Country of origin",
    "most_memorable_characteristics": "Most Memorable Characteristics column is a summary review of the most memorable characteristics of that bar. For simplicty, only the first feature is displayed",
    "ingredients" : "Ingredients, ('#' = represents the number of ingredients in the chocolate; B = Beans, S = Sugar, S* = Sweetener other than white cane or beet sugar, C = Cocoa Butter, V = Vanilla, L = Lecithin, Sa = Salt)"
};


const tags = document.querySelectorAll(".tag");
const defs = document.getElementById("hidden-def");

for (let tag of tags){
    //Show the definition of the variable when mouseover the corresponding tag
    tag.addEventListener("mouseover", function() {
        defs.style.display = "block";
        defs.textContent = var_def[this.innerText];

        //setting the position of the tag
        const tagRect = this.getBoundingClientRect();
        let topPos = tagRect.top + window.scrollY - defs.offsetHeight - 5;
        let leftPos = tagRect.left + window.scrollX + (tagRect.width / 2) - (defs.offsetWidth / 2);
        leftPos = Math.max(leftPos, 5);

        // Ensure the definition doesn't go off the side of the screen
        const rightEdge = leftPos + defs.offsetWidth;
        if (rightEdge > window.innerWidth) {
            leftPos -= (rightEdge - window.innerWidth + 5);
        }
        defs.style.top = `${topPos}px`;
        defs.style.left = `${leftPos}px`;
    })
    //hide the defintion when mouseout the tag
    tag.addEventListener("mouseout", function() {
        defs.style.display = "none";
    })
}


//Populate the dropdown menu for choosing variables for x-axis of graph
const variables = document.querySelector('#var-select'); 

//populate the dropdown with all the tag variables
for(let tag of tags){
    // st option attributes
    const option = document.createElement('option'); 
    option.value = tag.textContent; 
    option.textContent = tag.textContent; 
    // Add the option to the select element
    variables.appendChild(option); 
}

// Add a click event listener to each tag
for(let tag of tags){
    tag.addEventListener('click', function() {
    // Set the corresponding dropdown option as selected when a tag is clicked
        variables.value = this.textContent;
        updateGraph(this.textContent);
    })
}

// Default variable to display
const defaultVariable = 'company_location'; 
updateGraph(defaultVariable); 

// Event listener for the dropdown changes
const selectElement = document.getElementById('var-select');
selectElement.addEventListener('change', function() {
    updateGraph(this.value);
})
    
// This part listens for user interaction with the dropdown
selectElement.addEventListener('change', () => interval.stop(), {once: true});



//Generalize the chapter number, name, and background for different chapters

//The objects for different chapters
const Chapters= {
    "Chapter1": {
        chapNumber: "CHAP1",
        chapName:"BAR CHART",
    },
    "Chapter2": {
        chapNumber: "CHAP2",
        chapName:"HISTOGRAM"
    },
    "Chapter3": {
        chapNumber: "CHAP3",
        chapName:"LINE CHART"
    },
    "Chapter4": {
        chapNumber: "CHAP4",
        chapName:"PIE CHART"
    },
    "Chapter5": {
        chapNumber: "CHAP5",
        chapName:"SCATTER PLOT"
    },
    "Chapter6": {
        chapNumber: "CHAP6",
        chapName:"HEAT MAP"
    }
};

//search params
const queryString = window.location.search;

// create params object:
const params = new URLSearchParams(queryString);

// access params
const chosenChap = params.get('chap');
const chapDetail = Chapters[chosenChap].chapNumber;
const chartDetail = Chapters[chosenChap].chapName;

// get and set the Chapter number and name for each module page 
const targetChap = document.querySelector("#chap-detail");
targetChap.textContent = chapDetail;
const targetChart = document.querySelector('#chart-detail');
targetChart.innerText = chartDetail;


// Update the image
const chartImage = document.querySelector('#chart-img');
chartImage.src = 'assets/' + chapDetail + '.jpg';


function updateChapterNavigation() {
    const currentChap = params.get('chap');
    const chapterKeys = Object.keys(Chapters);
    const currentChapIndex = chapterKeys.indexOf(currentChap);
    const prevChapterBtn = document.getElementById('prevChapterBtn');
    const nextChapterBtn = document.getElementById('nextChapterBtn');

    if (currentChapIndex === 0) {
        // First chapter, change 'Previous Chapter' to 'Back to Menu'
        prevChapterBtn.textContent = 'Back to Menu';
        prevChapterBtn.onclick = function() { window.location.href = 'learn.html'; };
    } else {
        prevChapterBtn.innerHTML= '&#8592 Previous Chapter';
        prevChapterBtn.onclick = previousChapter;
    }

    if (currentChapIndex === chapterKeys.length - 1) {
        // Last chapter, change 'Next Chapter' to 'Back to Menu'
        nextChapterBtn.textContent = 'Back to Menu';
        nextChapterBtn.onclick = function() { window.location.href = 'learn.html'; };
    } else {
        nextChapterBtn.innerHTML= 'Next Chapter &#8594';
        nextChapterBtn.onclick = nextChapter;
    }
}

//Go to previous chapter
function previousChapter() {
    const currentChap = params.get('chap');
    const chapterKeys = Object.keys(Chapters);
    const currentChapIndex = chapterKeys.indexOf(currentChap);

    if (currentChapIndex > 0) {
        const prevChap = chapterKeys[currentChapIndex - 1];
        navigateToChapter(prevChap);
    }
}

//Go to next chapter
function nextChapter() {
    const currentChap = params.get('chap');
    const chapterKeys = Object.keys(Chapters);
    const currentChapIndex = chapterKeys.indexOf(currentChap);

    if (currentChapIndex < chapterKeys.length - 1) {
        const nextChap = chapterKeys[currentChapIndex + 1];
        navigateToChapter(nextChap);
    }
}

//Go to the page of the chapter
function navigateToChapter(chapter) {
    params.set('chap', chapter);
    const newUrl = window.location.pathname + "?" + params.toString();
    window.location.href = newUrl;
}

updateChapterNavigation();

