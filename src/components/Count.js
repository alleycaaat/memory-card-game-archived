import { DeckBtn } from './ui/DeckBtn';

const Count = ({ deck }) => {
    return (
        <>
            <div role='group' className='top'>
                <DeckBtn value={5} onClick={deck}>Few</DeckBtn>
                <DeckBtn value={10} onClick={deck}>Moderate</DeckBtn>
                <DeckBtn value={15} onClick={deck}>Lots</DeckBtn>
            </div>
        </>
    );
};

export default Count;
