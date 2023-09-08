import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { VideoContext } from '../services/VideoContext';
import HomeService from './HomeService';
import { Grid } from '@mui/material';
import './Home.css'

function Home() {
    const { SelectedVideo, video } = useContext(VideoContext)
    const [url, setUrl] = useState()

    const [listVideo, setListVideo] = useState([]);

    useEffect(() => {
        if (video.id > 0) {
            setUrl(`https://localhost:5001/api/Player/Player/${video.id}`)
        }
    }, [video.id])

    useEffect(() => {
        HomeService
            .getVideo(video)
            .then((response) => {
                setListVideo(response.data)
            }).catch((e) => {
                console.log(e)
            })
    }, [])

    const handleClick = (value) => {
        setUrl("")
        SelectedVideo(value)
    }

    return (
        <Grid container xs={12} className='container'>
            <Grid item xs={10} container justifyContent='center' alignItems='center'>
                <Grid item xs={8}>
                    {
                        url &&
                        (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <video video controls width="100%" height="100%" autoplay="autoplay">
                                        <source src={url} type="video/mp4" />
                                    </video>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <h1>{`Título: ${video.titulo}`}</h1>
                                </div>
                            </>
                        )
                    }
                </Grid>

            </Grid>
            <Grid item xs={2}>
                <Grid item xs={12} style={{ height: '95vh', overflowY: 'scroll', paddingBottom: '50px' }}>
                    {listVideo.length > 0 ? (
                        <>
                            {listVideo.map((item) => {
                                return (
                                    <Grid item xs={11} key={item.id}>
                                        <div
                                            className="cardBorder"
                                            onClick={() => handleClick(item)}>
                                            <h1 style={{ textAlign: 'center' }}>{item.titulo}</h1>
                                        </div>
                                    </Grid>
                                )
                            })}
                        </>
                    ) : (<h1>teste - {listVideo.length}</h1>)}
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Home
