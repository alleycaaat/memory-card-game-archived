const Difficulty = ({ details, deck }) => {
    return (
        <>
            <h2>Difficulty level:</h2>
            <div role='group' className='top'>
                <button
                    className={details.difficulty === 'normal' ? 'option selected' : 'option'}
                    name='difficulty'
                    value='normal'
                    onClick={deck}
                >
                    Normal
                </button>
                <button
                    className={details.difficulty === 'hard' ? 'option selected' : 'option'}
                    name='difficulty'
                    value='hard'
                    onClick={deck}
                >
                    Challenging
                </button>
            </div>
        </>
    );
};

export default Difficulty;
