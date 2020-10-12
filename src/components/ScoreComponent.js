import React from 'react'

export const ScoreComponent = ({ rounds = [] }) => {




    return (
        <div>
            <h1 className="d-flex justify-content-center">Score</h1>
            <hr />
            {
                rounds.length > 0 &&
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Round</th>
                            <th scope="col">Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rounds.map( (round, i) => {
                            // return <li key={i}>{i+1} </li>
                            return  <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{round.winner ? round.name : 'no winner'}</td>
                                    </tr>
                            })
                        }
                    
                    </tbody>
                </table>
            }
        </div>
    )
}
