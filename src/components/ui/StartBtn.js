const StartBtn = ({ count, details, setDetails, category, difficulty, setLoading, countCards }) => {
    const start = () => {
        //veryify all necessary information is in state
        setDetails({ ...details, display: '' });
        if (count === 0) {
            return setDetails({
                ...details,
                display: 'Please choose a card amount',
            });
        }
        if (category === undefined) {
            return setDetails({
                ...details,
                display: 'Please select a category'
            });
        }
        if (difficulty === undefined) {
            return setDetails({
                ...details,
                display: 'Please select a difficulty level',
            });
        }
        //set loading screen, start deck building process
        setLoading(true);
        countCards();
    };
    return (
        <button className='option' onClick={start}>Start</button>
    );
};

export default StartBtn;