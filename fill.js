
let wordDisplay = document.getElementById('word_display');
let score = 100;

let inputs = document.getElementsByName('text')


function createString() {
    let str = ""
    inputs.forEach(i => str += i.value || '?')
    return str
}

function fetchWords() {
    let word = createString()
    let letterLength = word.match(/\w/g).length

    if (letterLength >= 1) {
        fetch(`https://api.datamuse.com/words?sp=${word}`)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function (data) {
                        let filteredListItems = data.filter(w => w.score >= score).map(w => `<li>${w.word}</li>`)
                        let filteredList = `<ul>${filteredListItems.join('')}</ul>`
                        wordDisplay.innerHTML = filteredList
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }
}

inputs.forEach(i => i.addEventListener('input', fetchWords))



