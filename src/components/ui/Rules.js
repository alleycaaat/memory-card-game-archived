const Rules = () => {
    return (
        <div aria-label='how to play and game options explained' className='rules'>
            <h3>How to play:</h3>
            <p>This is a memory game.  Click on two cards to flip them over.</p>
            <p>If they match, they will stay visible.  If they don't match, they'll flip back over.</p>
            <p>The goal is to match all of the cards, so remember where the cards are.</p>
            <p>The game will be over and the timer will stop when all the cards have been matched.</p>
            <h4>Deck options:</h4>
            <p>There are three categories: colors, math, and coding.</p>
            <ul>
            <li>Colors has different colored tiles to matched.</li>
            <li>Math has various math problems to match.</li>
            <li>Coding has an array of coding icons to pair.</li>
            </ul>
            <p>With <strong>challenging difficulty</strong>, the cards do not visually match exactly.</p>
            <p>Colors wil need to be paired with their HEX.</p>
            <p>Math problems will match with their answer.</p>
            <p>Coding cards pair up with the logo name.</p>
            <p>To hide these rules, click the <strong>rules</strong> button again.</p>
        </div>
    );
};

export default Rules;
