const Options = ({ category, onClick, value, children }) => {
    return (
        <button
            className={category === value ? 'option selected' : 'option'}
            name='category'
            value={value}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Options;
