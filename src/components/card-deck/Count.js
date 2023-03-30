const Count = ({ deck, details }) => {
    return (
        <>
            <h2>Card amount:</h2>
            <div role='group' className='top'>
                <button
                    value={5}
                    name='count'
                    className={details.count === '5' ? 'option selected' : 'option'}
                    onClick={deck}
                    details={details}
                >
                    Few
                </button>
                <button
                    value={10}
                    name='count'
                    className={details.count === '10' ? 'option selected' : 'option'}
                    onClick={deck}
                    details={details}
                >
                    Moderate
                </button>
                <button
                    value={15}
                    name='count'
                    className={details.count === '15' ? 'option selected' : 'option'}
                    onClick={deck}
                    details={details}
                >
                    Lots
                </button>
            </div>
        </>
    );
};

export default Count;
