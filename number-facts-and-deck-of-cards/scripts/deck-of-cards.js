document.addEventListener("DOMContentLoaded", () => {
    // Single card
    const singleCardUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

    fetch(singleCardUrl)
        .then(response => response.json())
        .then(data => {
            const deckId = data.deck_id;
            return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        })
        .then(response => response.json())
        .then(data => {
            const card = data.cards[0];
            const singleCardDiv = document.getElementById('single-card');
            singleCardDiv.innerText = `${card.value} of ${card.suit}`;
        })
        .catch(error => console.error('Error:', error));

    // Two cards
    fetch(singleCardUrl)
        .then(response => response.json())
        .then(data => {
            const deckId = data.deck_id;
            return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then(response => response.json())
                .then(data => {
                    const card1 = data.cards[0];
                    const twoCardsDiv = document.getElementById('two-cards');
                    twoCardsDiv.innerText = `${card1.value} of ${card1.suit}`;
                    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                        .then(response => response.json())
                        .then(data => {
                            const card2 = data.cards[0];
                            twoCardsDiv.innerText += ` and ${card2.value} of ${card2.suit}`;
                        });
                });
        })
        .catch(error => console.error('Error:', error));

    // Draw cards
    let deckId;
    const drawCardButton = document.getElementById('draw-card-button');
    const cardsDiv = document.getElementById('cards');

    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            drawCardButton.disabled = false;
        })
        .catch(error => console.error('Error:', error));

    drawCardButton.addEventListener('click', () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => response.json())
            .then(data => {
                if (data.remaining === 0) {
                    drawCardButton.disabled = true;
                }
                const card = data.cards[0];
                const cardImg = document.createElement('img');
                cardImg.src = card.image;
                cardsDiv.appendChild(cardImg);
            })
            .catch(error => console.error('Error:', error));
    });
});
