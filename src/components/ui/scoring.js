export const Scoring = ({timer, score}) => {
  return (
      <div className='bottom'>
          <div className='display'>
              {timer}
              {timer === 1 ? ' second' : ' seconds'}
          </div>
          <div className='display'>
              {score}
              {score === 1 ? ' incorrect guess' : ' incorrect guesses'}
          </div>
      </div>
  )
}
