import React, { useEffect, useState } from 'react'
import { setRoundWinner, setWinnerGame } from '../actions/game';
import { useFetch } from '../hooks/useFetch';
import { useForm } from '../hooks/useForm';
import { ScoreComponent } from './ScoreComponent';

export const GameScreen = ({location, history}) => {
    const roundsMax = parseInt(process.env.REACT_APP_ROUNDS);
    const game = location.state.game;
    const [roundsComplete, setRoundsComplete] = useState(0);

    const [{player1, player2}] = useState({
        player1: {...location.state.player1.user},
        player2: {...location.state.player2.user},
    });
    const [{ data:moves, loading }] = useFetch('move');
    const [ form, handleInputChange, reset ] = useForm({
        player1move: '',
        player2move: ''
    });
    const [rounds, setRounds] = useState([]);
    
    const { player1move, player2move } = form;

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        const movep1 = moves.find( move => move.move === player1move);
        const movep2 = moves.find( move => move.move === player2move);

        if (player1move === player2move) {
            let resp = await setRoundWinner(player1, player2, movep1, movep2, null);
            setRounds([...rounds, {winner: false, _id: resp._id}]);
        } else {
            if (movep1.kills === movep2.move) {
                let resp = await setRoundWinner(player1, player2, movep1, movep2 ,player1._id);
                setRounds([...rounds, {name: player1.name, winner: player1._id, _id: resp._id}]);
            } else if (movep2.kills === movep1.move) {
                let resp = await setRoundWinner(player1, player2, movep1, movep2, player2._id);
                setRounds([...rounds, {name: player2.name, winner: player2._id, _id: resp._id}]);
            } else {
                let resp = await setRoundWinner(player1, player2, movep1, movep2, null);
                setRounds([...rounds, {winner: false, _id: resp._id}]);
            }
        }

        reset();
    }

    useEffect(() => {
        if (roundsMax === roundsComplete) {
            setWinnerGame(game._id, rounds, player1, player2)
                .then( resp => {
                    history.push('/finish', resp.winner)
                });
        } else {
            setRoundsComplete(roundsComplete+1);
        }

    }, [rounds])

    return (
        <div className="container mt-5 row" >

            <div className="col-6">
                <h1 className="d-flex justify-content-center">Round {rounds.length +1}</h1>
                <hr />

                { loading && <p className="animate__animated animate__flash">Loading...</p> }

                <div className="d-flex align-items-center justify-content-center">
                    { !player1move ?  player1.name :player2.name }
                </div>

                <form onSubmit={ handleSubmit }>
                    {
                        !player1move 
                        && 
                        <div className="form-group">
                            <label>Select Move</label>
                            <select 
                                className="form-control" 
                                name="player1move"
                                value={ player1move }
                                onChange={ handleInputChange }
                            >
                                <option value={false}>Select...</option>
                                {
                                    moves &&
                                    moves.map( move => {
                                        return <option key={ move._id }> { move.move }</option>
                                    })
                                }
                            </select>
                        </div>
                    }

                    {
                        player1move 
                        && 
                        <div className="form-group">
                            <label>Select Move</label>
                            <select 
                                className="form-control" 
                                name="player2move"
                                value={ player2move }
                                onChange={ handleInputChange }
                            >
                                <option  >Select...</option>

                                {
                                    moves &&
                                    moves.map( move => {
                                        return <option key={ move._id }> { move.move }</option>
                                    })
                                }
                            </select>
                        </div>
                    }
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        disabled={ !player1move || !player2move }    
                    >
                        Ok
                    </button>
                </form>
            </div>
            <div className="col-6">
                    <ScoreComponent rounds={rounds}/>
            </div>

            

        </div>
    )
}
