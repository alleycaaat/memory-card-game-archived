const getCards = (cat) => {
    console.log('API CALL', cat);
    return fetch('/.netlify/functions/cards', {
        body: JSON.stringify(cat),
        method: 'POST',
    }).then((response) => {
        return response.json();
    });
};

export {getCards}
