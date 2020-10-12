import React from 'react'
import { startGame } from '../actions/game';
import { useForm } from '../hooks/useForm';

export const StartScreen = ({ history }) => {


    const [ form, handleInputChange ] = useForm({
        player1: '',
        player2: ''
    });

    const { player1, player2 } = form;

    const handleStart = async ( e ) => {
        e.preventDefault();
        const resp = await startGame(player1, player2);
        history.push('/game', resp);
    }
    


    return (
        <div className="container mt-5">
            <h1>Enter Player's Names</h1>
            <hr />
            <form onSubmit={ handleStart }>
                <div className="form-group">
                    <label>Player 1</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="player1"
                        value={ player1 }
                        aria-describedby="player1"
                        placeholder="Enter Name"
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <label>Player 2</label>
                    <input
                        type="text"
                        className="form-control"
                        name="player2"
                        value={ player2 }
                        aria-describedby="player2"
                        placeholder="Enter Name"
                        onChange={ handleInputChange }
                    />
                </div>
                <button type="submit" className="btn btn-primary">START</button>
            </form>
        </div>
    )
}
