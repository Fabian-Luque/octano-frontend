import React from 'react'
import { useFetch } from '../hooks/useFetch'


export const HistoryScreen = () => {
    const [{ data:results }] = useFetch( `game` );

    return (
        <div className="container pt-5">
            <h1 className="d-flex justify-content-center">History Game</h1>
            <hr />

            {
                !results ? 
                    <h5>No results</h5>:
                     
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Player 1</th>
                            <th scope="col">Player 2</th>
                            <th scope="col">Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results?.map( (result, i) => {
                                return <tr key={result._id}>
                                            <th scope="row">{i+1}</th>
                                            <td>{result.player1?.name}</td>
                                            <td>{result.player2?.name}</td>
                                            <td>{ result.winner ? result.winner?.name : 'No winner'}</td>
                                        </tr>
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
