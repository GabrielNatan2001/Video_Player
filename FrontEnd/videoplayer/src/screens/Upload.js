import { Alert, Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import UploadService from './UploadService'

function Upload(props) {
    const initialState = {
        titulo: '',
        file: undefined,
        msgError: '',
        msgSuccess: ''
    }
    const [data, setData] = useState(initialState)

    const handleChange = ({ target: { name, value } }) => {
        setData({ ...data, [name]: value })
    }

    const handleSelectedImage = (e) => {
        const fileUploaded = e.target.files[0];
        setData({ ...data, file: fileUploaded })
    }

    const handleSend = () => {
        debugger;
        const formData = new FormData();
        formData.append("titulo", data.titulo);
        formData.append("file", data.file);

        console.log(formData)

        UploadService
            .upload(formData)
            .then((response) => {
                setData({ ...initialState, msgSuccess: 'SALVO COM SUCESSO', msgError: '' })
            }).catch((e) => {
                setData({ ...data, msgError: 'ERRO AO SALVAR', msgSuccess: '' })
            })
    }

    return (
        <Grid container item xs={12} justifyContent='center' style={{ height: '80vh', border: '1px solid black', paddingTop: '30px' }}>
            <Grid item xs={4}>
                {data.msgError != '' && (
                    <Grid xs={12}>
                        <h5 style={{ textAlign: 'center', color: 'red' }}>
                            {data.msgError}
                        </h5>
                    </Grid>
                )}
                {data.msgSuccess != '' && (
                    <Grid xs={12}>
                        <h5 style={{ textAlign: 'center', color: 'green' }}>
                            {data.msgSuccess}
                        </h5>
                    </Grid>
                )}

                <Grid xs={12}>
                    <TextField
                        fullWidth
                        label="Titulo"
                        name="titulo"
                        onChange={handleChange}
                        value={data.titulo}
                        variant="standard"
                    />
                </Grid>
                <Grid xs={12}>
                    <Button
                        component="label"
                        variant="contained"
                        href="#file-upload"
                        style={{ width: '100%', marginTop: '30px' }}
                    >
                        {data.file ? (`Arquivo Selecionado: ${data.file?.name}`)
                            : ("Upload a file")}
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleSelectedImage}
                        />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <button
                        onClick={handleSend}
                        style={{ width: '100%', marginTop: '30px' }}>
                        Enviar
                    </button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Upload
