/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
         
    if(scannedTextObj.length < 1) {
        return {
            results: []
        };
    }

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
     

    for(let item of scannedTextObj) {
            let wordBreak = {};
        for(let page of item.Content) {
            let line = page.Text.split(" ");

            /* Check if first word in this line combined with the last broken word
               in the previous line equals the search term. */
            if((wordBreak.Part + line[0]) == searchTerm) {
                let newRes = createNewRes(item.ISBN, wordBreak.Page, wordBreak.Line);
                result.Results.push(newRes);
                wordBreak = {Part: ""}
            }
            
            /* 
               Iterate throught the entire line, word by word, if there is a word match
               add to the results
            */
            for(let index = 0; index < line.length; index++) {
                let word = line[index];
                    if(word === searchTerm) {
                    let newRes = createNewRes(item.ISBN, page.Page, page.Line)
                    result.Results.push(newRes);                
                }      
                
            } 

            /* 
            If word contains a break at the end of the line, we 
            are going to carry the word-part, page, and line info to the next
            line 
            */
            let lastWord = line[line.length - 1];
            if(lastWord.includes("-")) {
                wordBreak =  {
                    "Part" : lastWord.substring(0, lastWord.length - 1),
                    "Page" : page.Page,
                    "Line" : page.Line                        
                }
            } 
            
        }
    }
    
    return result; 
}

function createNewRes(isbn, page, line) {
    return {
        "ISBN": isbn,
        "Page": page,
        "Line": line 
    }
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 30,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}



/* Test Case 2 Input Object*/
const capSenCase = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 30,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness in moment. His"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 

    }
]

/* Test Case 2 Output Object */
const capSenCaseOut = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 30,
            "Line": 8
        }
    ]
}

/* Test Case 3 Input Object*/
const wordBreakCaseIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 30,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]


/* Test Case 3 Output Object*/
const wordBreakCaseOut = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 30,
            "Line": 8
        }
    ]
}

/* Test Case 4 Input Object*/
const multiLineCaseIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 30,
                "Line": 8,
                "Text": "now simply went and on by her own momentum.  The dark-"
            },
            {
                "Page": 30,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 30,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/* Test Case 4 Output Object*/
const multiLineCaseOut = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 30,
            "Line": 8
        }, 
        {
            "ISBN": "9780000528531",
            "Page": 30,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 30,
            "Line": 10
        }
    ]
}

/* Test Case 5 Input Object*/
const multiBookCaseIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 30,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }, 
    {
        "Title": "Twenty Thousand Leagues Under the Sea Part II",
        "ISBN": "9780000528532",
        "Content": [
            {
                "Page": 29,
                "Line": 8,
                "Text": "Twenty Thousand Leagues under the sea continued."
            },
            {
                "Page": 30,
                "Line": 9,
                "Text": "and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "I asked myself how he had managed to see"
            } 
        ] 
    }
]

/* Test Case 5 Output Object*/
const multiBookCaseOut = {
    "SearchTerm": "Canadian\'s",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }, 
        {
            "ISBN": "9780000528532",
            "Page": 30,
            "Line": 9
        }
    ]
}


/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
    

/**
 * Outputs to console whether test passed or failed 
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @param {JSON} - the expected results.
 * */
count = 1;
function testCase(term, obj, expected) {
    const result = findSearchTermInBooks(term, obj);
    if((JSON.stringify(result) === JSON.stringify(expected))) {
        console.log(`PASS: Case ${count}`);
    } else {
        console.log(`FAIL: Case ${count}`);
        console.log("Expected:", expected);
        console.log("Received:", result);
    }
    
    count += 1;
}

testCase("The", twentyLeaguesIn, twentyLeaguesOut);
testCase("The", capSenCase, capSenCaseOut);
testCase("darkness", wordBreakCaseIn, wordBreakCaseOut);
testCase("and", multiLineCaseIn, multiLineCaseOut);
testCase("Canadian's", multiBookCaseIn, multiBookCaseOut);



