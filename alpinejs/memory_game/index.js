
function pause(milliseconds = 1000) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function flash(message) {
    window.dispatchEvent(new CustomEvent("flash", {
        detail: { message }
    }));
}

function game() {
    return {
        cards: [
            {color: 'green', flipped: false, cleared: false},
            {color: 'green', flipped: false, cleared: false},
            {color: 'blue', flipped: false, cleared: false},
            {color: 'blue', flipped: false, cleared: false},
            {color: 'pink', flipped: false, cleared: false},
            {color: 'pink', flipped: false, cleared: false},
            {color: 'black', flipped: false, cleared: false},
            {color: 'black', flipped: false, cleared: false},
        ],

        get flippedCards() {
            return this.cards.filter(card => card.flipped);
        },

        get clearedCards() {
            return this.cards.filter(card => card.cleared);
        },

        get remainingCards() {
            return this.cards.filter(card => !card.cleared);
        },

        get points() {
            return this.clearedCards.length;
        },

        async flipCard(card) {
            if (this.flippedCards.length === 2) {
                return;
            }

            card.flipped = !card.flipped;

            if (this.flippedCards.length === 2) {
                if (this.hasMatch()) {
                    flash("You found a match!");
                    await pause();
                    this.flippedCards.forEach(card => card.cleared = true);

                    // is the game over?
                    // if there are no remaining cards
                    if (!this.remainingCards.length) {
                        alert("you win!");
                    }
                }

                await pause();

                this.flippedCards.forEach(card => card.flipped = false);
            }
        },

        hasMatch() {
            return this.flippedCards[0]['color'] === this.flippedCards[1]['color'];
        }
    }
}
