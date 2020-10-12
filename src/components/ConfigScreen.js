import React from 'react'
import { addConfig, deleteConfig } from '../actions/game';
import { useFetch } from '../hooks/useFetch';
import { useForm } from '../hooks/useForm';

export const ConfigScreen = () => {

    const [state, reload ]  = useFetch( `move` );
    const [ form, handleInputChange, reset ] = useForm({
        move: '',
        kills: ''
    });

    const { move, kills } = form;


    const handleSubmit = async (e) => {
        e.preventDefault();
        await addConfig(form);
        reset();
        reload();
    }

    const handleDelete = async (move, i) => {
        await deleteConfig(move);
        reload();
    }



    
    
    return (
        <div className="container pt-5">
            <h1 className="d-flex justify-content-center">Config</h1>
            
            <form className="mb-5" onSubmit={ handleSubmit }>
                <div className="row mb-2">
                    <div className="col">
                        <label>Move</label>
                        <input
                            type="text"
                            name="move"
                            value={ move }
                            onChange={ handleInputChange }
                            className="form-control"
                            placeholder="move..."
                        />
                    </div>
                    <div className="col">
                        <label>kills</label>
                        <input
                            type="text"
                            name="kills"
                            value={ kills }
                            onChange={ handleInputChange }
                            className="form-control"
                            placeholder="kills..." 
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Move</th>
                        <th scope="col">Kill</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state?.data && state.data.map( (move, i) => {
                            return <tr key={move._id}>
                                <th scope="row">{i+1}</th>
                                <td>{ move.move }</td>
                                <td>{ move.kills }</td>
                                <td>
                                    <button onClick={ () => handleDelete(move, i) } className="btn btn-danger ml-1"> Delete </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
                </table>


        </div>
    )
}
