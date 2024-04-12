import React, { useState, useEffect } from "react";

function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });

    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then((res) => res.json())
        .then((data) => setAllMemes(data.data.memes));
    }, []);

    function getRandomImage() {
        const memeImg = allMemes[Math.floor(Math.random() * allMemes.length)];
        let url = memeImg.url;

        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: url,
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }));
    }

    return (
        <main>
            <div className="flex flex-col">
                <div className="flex justify-center w-full gap-4 mb-4"> 
                    <input
                    type="text"
                    placeholder="Top text"
                    className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    />
                    <input
                    type="text"
                    placeholder="Bottom text"
                    className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex justify-center">
                <button className="rounded-full bg-blue-200 p-4" onClick={getRandomImage}>
                    Get a new meme image 🖼️
                </button>
                </div> 
            </div>
            <div className="relative mt-12 flex justify-center">
                <img src={meme.randomImage} className="meme-image" alt="meme" />
                <h2 className="font-bold absolute mt-[50px] text-3xl text-white ms-[10px]">{meme.topText}</h2>
                <h2 className="absolute mt-[250px] font-bold text-3xl text-white ms-[10px]
                ">{meme.bottomText}</h2>
            </div>
        </main>
    );
}

export default Meme;
