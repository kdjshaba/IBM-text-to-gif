import {useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

//Component for getting user's search log history
function History(props){
    const [historyGifs, setHistoryGifs] = useState(null)
    const { user } = useAuthContext()

    //Function for fetching search logs through backend
    const fetchGifs = async () => {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/logs', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok){
            setHistoryGifs(json)
        }
    }

    //React hook, which will fetch search logs every reload or on submitting new search
    useEffect(() => {
        fetchGifs();
    }, [props.reset])

    return(
        <div className="history">
            <p>Last 5 Searches</p>
            <div className="history-line"></div>
            <div className="history-gifs">
                {historyGifs && historyGifs.map(gif => (
                    <div key={gif._id}>
                        <img className="gif" src={gif.gifUrl}></img>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default History;