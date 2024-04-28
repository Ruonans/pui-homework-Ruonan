const Chapters= {
    "Chapter1": {
        chapNumber: "CHAP1",
        chapName:"BAR CHART"
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




const var_def = {
    "company_location" : "Manufacturer region",
    "specific_bean_origin_or_bar_name": "Specific bean or bar name",
    "company_manufacturer": "Manufacturer name",
    "cocoa_percent": "Cocoa percent (% chocolate)",
    "country_of_bean_origin": "Country of origin",
    "most_memorable_characteristics": "Most Memorable Characteristics column is a summary review of the most memorable characteristics of that bar. For simplicty, only the first feature is displayed",
    "ingredients" : "Ingredients, ('#' = represents the number of ingredients in the chocolate; B = Beans, S = Sugar, S* = Sweetener other than white cane or beet sugar, C = Cocoa Butter, V = Vanilla, L = Lecithin, Sa = Salt)"
}




document.addEventListener("DOMContentLoaded", function() {

    const tags = document.querySelectorAll(".tag");
    const defs = document.getElementById("hidden-def");

    tags.forEach(tag => {
        tag.addEventListener("mouseover", function() {
            defs.style.display = "block";
            defs.textContent = var_def[this.innerText];

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
        });

        tag.addEventListener("mouseout", function() {
            defs.style.display = "none";
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const tags = document.querySelectorAll('.tag'); // Select all tags
    const variables = document.querySelector('#var-select'); // The select element

    // First, populate the dropdown with all the tag variables
    tags.forEach(tag => {
        const option = document.createElement('option'); // Create a new option element
        option.value = tag.textContent; // The value is the text content of the tag
        option.textContent = tag.textContent; // The text content is also the text content of the tag
        variables.appendChild(option); // Add the option to the select element
    });

    // Add a click event listener to each tag
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Set the corresponding dropdown option as selected when a tag is clicked
            variables.value = this.textContent;
            updateGraph(this.textContent);
        });
    });

    const defaultVariable = 'company_location'; // Default variable to display
    updateGraph(defaultVariable); // Initial graph

    // Event listener for the dropdown changes
    const selectElement = document.getElementById('var-select');
    selectElement.addEventListener('change', function() {
        updateGraph(this.value);
    });
    
    // This part listens for user interaction with the dropdown
    // and stops the automatic cycling through the options
    selectElement.addEventListener('change', () => interval.stop(), {once: true});

});


//search params
const queryString = window.location.search;

// create params object:
const params = new URLSearchParams(queryString);

// access params
const chosenChap = params.get('chap');
console.log(chosenChap);
const chapDetail = Chapters[chosenChap].chapNumber;
console.log(chapDetail);
const chartDetail = Chapters[chosenChap].chapName;



const targetChap = document.querySelector("#chap-detail");
console.log(targetChap);
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

function previousChapter() {
    const currentChap = params.get('chap');
    const chapterKeys = Object.keys(Chapters);
    const currentChapIndex = chapterKeys.indexOf(currentChap);

    if (currentChapIndex > 0) {
        const prevChap = chapterKeys[currentChapIndex - 1];
        navigateToChapter(prevChap);
    }
}

function nextChapter() {
    const currentChap = params.get('chap');
    const chapterKeys = Object.keys(Chapters);
    const currentChapIndex = chapterKeys.indexOf(currentChap);

    if (currentChapIndex < chapterKeys.length - 1) {
        const nextChap = chapterKeys[currentChapIndex + 1];
        navigateToChapter(nextChap);
    }
}

function navigateToChapter(chapter) {
    params.set('chap', chapter);
    const newUrl = window.location.pathname + "?" + params.toString();
    window.location.href = newUrl;
}

document.addEventListener("DOMContentLoaded", function() {
    updateChapterNavigation();
});
