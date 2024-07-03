document.addEventListener("DOMContentLoaded", () => {
    const favoriteNumber = 7; // Replace with your favorite number
    const url = `http://numbersapi.com/${favoriteNumber}?json`;

    // Single fact
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('number-fact').innerText = data.text;
        })
        .catch(error => console.error('Error:', error));

    // Multiple numbers
    const numbers = [4, 10, 22];
    const multiUrl = `http://numbersapi.com/${numbers}?json`;

    fetch(multiUrl)
        .then(response => response.json())
        .then(data => {
            const factsDiv = document.getElementById('multiple-number-facts');
            for (const num in data) {
                const fact = document.createElement('p');
                fact.innerText = data[num];
                factsDiv.appendChild(fact);
            }
        })
        .catch(error => console.error('Error:', error));

    // Four facts on favorite number
    const requests = [fetch(url), fetch(url), fetch(url), fetch(url)];

    Promise.all(requests)
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(facts => {
            const factsDiv = document.getElementById('multiple-facts');
            facts.forEach(fact => {
                const factParagraph = document.createElement('p');
                factParagraph.innerText = fact.text;
                factsDiv.appendChild(factParagraph);
            });
        })
        .catch(error => console.error('Error:', error));
});
