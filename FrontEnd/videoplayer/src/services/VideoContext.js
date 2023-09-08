import { createContext, useContext, useState } from 'react';

export const VideoContext = createContext();

// Passo 2: Criar um provedor (Provider)
export const VideoProvider = (props) => {
    const [video, setVideo] = useState({});

    const SelectedVideo = (obj) => {
        setVideo(obj)
    };

    return (
        <VideoContext.Provider value={{ SelectedVideo, video }}>
            {props.children}
        </VideoContext.Provider>
    );
}