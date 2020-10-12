import { requestFetch } from "../helpers/fetch";


export const startGame = async ( player1, player2 ) => {
    player1 = await requestFetch( 'user/create', { name: player1 }, 'POST' );
    player2 = await requestFetch( 'user/create', { name: player2 }, 'POST' );
    player1 = await player1.json();
    player2 = await player2.json();
    
    if( player1.ok && player2.ok) {
        
        let game = await requestFetch( 'game/create', { 
            player1: player1.user, 
            player2: player2.user
        }, 'POST' );
        game = await game.json();
        game.ok && console.error('Hubo un error al crear la partida');

        return {player1, player2, game};
    } else {
        console.error('Hubo un error al crear la partida');
    }
}


export const setWinnerGame = async ( game, rounds, player1, player2) =>{
    let counts = {};
    counts[player1.name] = 0; 
    counts[player2.name] = 0; 
    rounds.forEach(function(x) { counts[x.name] = (counts[x.name] || 0)+1; });
    rounds = rounds.map(x => x._id);
    let resp;
    if (counts[player1.name] === counts[player2.name]) {
        resp = await requestFetch(`game/update/${game}`, {
            rounds,
            winner: null
        },'PUT');
    } else if (counts[player1.name] > counts[player2.name]) {
        resp = await requestFetch(`game/update/${game}`, {
            rounds,
            winner: player1._id
        },'PUT');
    } else {
        resp = await requestFetch(`game/update/${game}`, {
            rounds,
            winner: player2._id
        },'PUT');
    }

    return resp.json();

}

export const setRoundWinner = async (player1, player2, player1move, player2move, winner) => {
    let resp = await requestFetch('round/create', {
        player1 : player1._id,
        player2 : player2._id,
        player1move : player1move._id,
        player2move : player2move._id,
        winner: winner
    }, 'POST');
    return resp.json();
} 

export const addConfig = async ( config ) => {
    console.log(config);
    let resp = await requestFetch('move/create', config, 'POST')
    return resp.json();
}

export const deleteConfig = async ( config ) => {
    console.log(config);
    let resp = await requestFetch(`move/delete?moveID=${config._id}`, {} ,'DELETE');
    return resp.json();
}