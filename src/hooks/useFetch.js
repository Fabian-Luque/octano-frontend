// import { useState, useEffect } from "react"
// import { requestFetch } from "../helpers/fetch";


// export const useFetch = ( url ) => {
    
//     const [state, setState] = useState({
//         data: [],
//         loading: true,
//         error: null
//     });

//     useEffect( () => {
//         requestFetch( url )
//             .then( moves => {
//                 setState({
//                     data: moves,
//                     loading: false
//                 });
//             });
//     },[url])


//     return state;

// }


import { useState, useEffect, useRef } from "react"
import { requestFetch } from "../helpers/fetch";


export const useFetch = ( url ) => {

    
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        
        return () => {
            isMounted.current = false;
        }

    }, [])

    
    useEffect(() => {
        
        setState({data:null, loading:true, error:null});

        requestFetch(url)
            .then( data => {
                if ( isMounted.current ) {
                    setState({
                        loading:false,
                        error:null,
                        data
                    });
                }
            });

    }, [url])


    const reload = () => {
        requestFetch(url)
            .then( data => {
                if ( isMounted.current ) {
                    setState({
                        loading:false,
                        error:null,
                        data
                    });
                }
            });
    }


    return [state, reload];

}
