import React from 'react'

export const FinishScreen = ({location, history}) => {
    const handlePlay = (e) => {
        e.preventDefault();
        history.replace('/start');
    }
    return (
        <div>
            <h1 className="d-flex justify-content-center mt-5 mb-5">{ location.state ? 'We have a WINNER!!' : 'No winner :('}</h1>

            <div className="d-flex justify-content-center">
                { location.state &&
                    <h2>{ location.state.name } is the new EMPEROR!</h2>
                }
            </div>

            <div className="d-flex justify-content-center mt-5">
                <button
                    className="btn btn-primary "
                    onClick={ handlePlay }
                >
                    Play Again
                </button>
            </div>

        </div>
    )
}
