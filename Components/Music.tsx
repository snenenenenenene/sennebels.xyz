import 'axios';
import axios from 'axios';
import {useEffect, useState} from 'react'
export default function Music() {

    const [data, setData] = useState({})

    useEffect(() => {
        axios
        .get("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rj&api_key=6a2a3384b4268840c9b85481a4a53ab0&format=json")
        .then(resp => {
            setData(resp)
        })
    }, [])
    console.log(data);
    return (
        <div>

        </div>
    )
}
