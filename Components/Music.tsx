import 'axios';
import axios from 'axios';
import {useEffect, useState} from 'react'
export default function Music() {

    const [song, setSong] = useState<any>({})
    const [artist, setArtist] = useState("")
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")

const getSong = async () => {
    await axios
    .get("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rj&api_key=6a2a3384b4268840c9b85481a4a53ab0&format=json")
    .then(async resp => {

        console.log(resp.data);
        try{
        setSong(resp.data.recenttracks.track[0]);
        setArtist(resp.data.recenttracks.track[0].artist['#text'])
        setTitle(resp.data.recenttracks.track[0].name)
        console.log(song);
        setImage(resp.data.recenttracks.track[0].image[3]["#text"]);
        // console.log(image);
        // console.log(song.image[0]["#text"]);
        console.log(artist);
        }
        catch {
            console.log("woop");
        }
        // console.log(song.data.recenttracks.track[0].artist);
    })
}

    useEffect(() => {
        getSong()
    }, [])

    return (
        <div className='w-screen flex-col my-8 p-24 justify-center flex bg-black h-11/12 text-white'>
            <h2 className='my-8'>
                <span>Currently Playing</span>
            <div id="wave">
    <span className="dot">.</span>
    <span className="dot">.</span>
    <span className="dot">.</span>
</div></h2>
            <div className="mx-auto text-center uppercase">
            <p className="font-light">{title}</p>
            <p className='font-regular'>{artist}</p>
            <img className='rounded-xl mt-3' src={image} alt="Image" />
            </div>
        </div>
    )
}
