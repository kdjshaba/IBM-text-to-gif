import { useState, useEffect } from "react"
import History from "../components/History";
import { useAuthContext } from '../hooks/useAuthContext'

//Component for text-to-gif search and history
function TextToGif(){

    const [textInput, setTextInput] = useState('')
    const [error, setError] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [reset, setReset] = useState(false)
    const { user } = useAuthContext()

    const textInputJSON = {"text": textInput}

    //Function for handling user's submit, which will bring back gif url through backend or error
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
            method: 'POST',
            body: JSON.stringify(textInputJSON),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        } else{
            setError(null)
            setTextInput('')
            setImageUrl(json.gifUrl)
            setReset(true)
        }
    }

    //Changes back reset value to false
    useEffect(() => {
        if (reset) {
          setReset(false);
        }
      }, [reset]);

    return(
        <div className="main">
            <form className="inputStringForm" onSubmit={handleSubmit}>
                <label htmlFor="inputText">Text:</label>
                <textarea id="inputText" placeholder="Input text:" onChange={(e) => setTextInput(e.target.value)} value={textInput}></textarea>
                <button className="submit-button">Generate</button>
            </form>
            {error && <div className="error">{error}</div>}

            {imageUrl && 
            <div className="generated-gif-container">
                <p>Generated GIF:</p>
                <div className="generated-gif">
                    <img className="gif" src={imageUrl}></img>
                </div>
            </div>}

            <History reset={reset}/>
            
        </div>
    )
}

export default TextToGif