import { useState, useEffect, useRef } from 'react';

import StartBtn from './components/ui/StartBtn';
import ResetBtn from './components/ui/ResetBtn';
import RulesBtn from './components/ui/RulesBtn';
import Difficulty from './components/card-deck/Difficulty';
import Message from './components/ui/Message';
import CardDeck from './components/card-deck/CardDeck';
import Loading from './components/loading';
import Options from './components/card-deck/Options';
import Count from './components/card-deck/Count';
import Rules from './components/ui/Rules';

import { Credit } from './components/ui/credit';
import { Scoring } from './components/ui/scoring';
import {getCards} from './api';

function App() {
    const [orgCards, setOrgCards] = useState([]); //original starting card deck from server
    const [picked, setPicked] = useState([]); //holds picked cards
    const [dup, setDup] = useState([]); //duplicate deck to easier match comparison
    const [deck, setDeck] = useState([]); //deck to be used for play

    const [running, setRunning] = useState(false); //timer run status
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);

    const [score, setScore] = useState(0);
    const [matches, setMatches] = useState(0);

    const initialState = {
        category: '',
        difficulty: '',
        count: 0,
        display: '',
        rulesstate: false
    };
    const [details, setDetails] = useState(initialState);
    const { category, count, display, rulesstate, difficulty } = details;

    const tick = useRef(null);

    //handles the timer
    useEffect(() => {
        if (running) {
            tick.current = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
        }
        return () => clearInterval(tick.current); //clear on unmount
    });

    useEffect(() => {
        if (category === undefined) {
            return console.log('exit early');
        }
        if (category !== '') {
            let carddeck = [];
            let running = true;
            setLoading(true);
            //api call to get card deck based on the category
            const getDeck = async () => {
                await getCards(category)
                    .then((cards) => {
                        //map over the data and push it to an array with proper formatting
                        cards.map((card, i) => {
                            carddeck.push({
                                name: card.data.name,
                                value: card.data.value,
                                index: i,
                            });
                            return carddeck;
                        });
                        //end loading screen once api call and mapping is complete
                        setLoading(false);
                        if (running) {
                            setOrgCards(carddeck);
                        }
                    })
                    .catch((e) => {
                        console.log('API error ', e);
                    });
            };
            getDeck();
            return () => (running = false);
        }
    }, [category]);

    //toggle visibility of rules
    const rules = () => {
        let currentState = rulesstate;
        setDetails({ ...details, rulesstate: !currentState });
    };
    //handles game options
    const deckOptions = (e) => {
        //if there's an error message, remove it
        setDetails({ ...details, display: '' });
        //if a game is in play, stop it
        if (running) {
            reset();
            clearInterval(tick.current);
        }
        const { name, value } = e.target;
        setDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    //handles counting out card amount
    const countCards = () => {
        let temp = [];
        let counted;
        temp = [...orgCards].sort(() => Math.random() - 0.5); //shuffle original array
        counted = temp.slice(0, count); //get correct amount of cards
        shuffleDeck(counted);
    };

    //handles shuffling the deck
    const shuffleDeck = (shuffled) => {
        let copy = [];
        let final = [];
        //if playing difficult, need to get the match card
        if (difficulty === 'hard') {
            shuffled.map((card) => {
                copy.push({
                    name: card.name,
                    value: card.value.concat('2'),
                });
                return copy;
            });
            //double the cards, shuffle, return
            let doubled = copy.concat(shuffled);
            doubled.sort(() => Math.random() - 0.5);
            doubled.map((card, i) => {
                final.push({
                    name: card.name,
                    value: card.value,
                    flipped: false,
                    match: false,
                    index: i,
                });
                return final;
            });
        } else {
            //if playing easy, double the deck, shuffle
            let doubled = shuffled.concat(shuffled);
            doubled.sort(() => Math.random() - 0.5);
            doubled.map((card, i) => {
                final.push({
                    name: card.name,
                    value: card.name,
                    index: i,
                    flipped: false,
                    match: false,
                });
                return final;
            });
        }
        //set the deck to play with, then duplicate for comparison
        //end loading screen, start timer
        setDeck(final);
        setDup(final);
        setLoading(false);
        setRunning(true);
    };
    //handles reset button
    const reset = () => {
        setRunning(false);
        setScore(0);
        setMatches(0);
        setDetails({ initialState });
        setTimer(0);
        setDeck([]);
        setPicked([]);
    };

    //handles winning game
    const gameOver = () => {
        if (matches === count - 1) {
            setRunning(false);
            setDetails({ display: 'You won!' });
        }
    };

    //checks cards for match, responds accordingly
    const check = () => {
        let match = picked[0].name === picked[1].name;
        if (match) {
            setDeck(dup);
            setPicked([]);
            setMatches((matches) => matches + 1);
            gameOver();
        } else {
            setTimeout(() => {
                dup[picked[0].index].flipped = false;
                dup[picked[1].index].flipped = false;
                dup[picked[0].index].match = false;
                dup[picked[1].index].match = false;
            }, 650);

            setScore((score) => score + 1);
            setDeck(dup);
            setPicked([]);
        }
    };

    //handles card selection
    const clicked = (card) => {
        let index = card.index;
        let name = card.name;

        if (picked.length === 2) {
            setTimeout(() => {
                check();
            }, 750);
        }
        //optimistically set flipped and match to true
        dup[index].flipped = true;
        dup[index].match = true;
        setDup(dup);

        picked.push({ name, index });
        setPicked(picked);
        if (picked.length === 2) {
            setTimeout(() => {
                check();
            }, 750);
        }
    };

    return (
        <main className='wrapper'>
            <div className='heading'>
                <h1>Memory Game</h1>
            </div>
            {!running && (
                <>
                    <h2>Category:</h2>
                    <div role='group' className='top'>
                        <Options
                            onClick={deckOptions}
                            category={category}
                            value='all_codes'>
                            Coding
                        </Options>
                        <Options
                            onClick={deckOptions}
                            category={category}
                            value='all_colors'>
                            Colors
                        </Options>
                        <Options
                            onClick={deckOptions}
                            category={category}
                            value='all_math'>
                            Math
                        </Options>
                    </div>

                    <Difficulty details={details} deck={deckOptions} />
                    <Count details={details} deck={deckOptions} />
                </>
            )}
            <div className='miscbuttons'>
                <StartBtn
                    count={count}
                    details={details}
                    setDetails={setDetails}
                    category={category}
                    difficulty={difficulty}
                    setLoading={setLoading}
                    countCards={countCards}
                />
                <ResetBtn onClick={reset} />
                <RulesBtn onClick={rules} />
            </div>

            <Scoring timer={timer} score={score} />
            <Message msg={display} />

            {loading && <Loading />}
            {rulesstate && <Rules />}

            <div className='cardHolder'>
                {deck.map((card, i) => (
                    <div key={i}>
                        <CardDeck
                            index={card.index}
                            card={card}
                            flipped={card.flipped}
                            match={card.match}
                            value={card.value}
                            clicked={clicked}
                        />
                    </div>
                ))}
            </div>
            <Credit />
        </main>
    );
}

export default App;
