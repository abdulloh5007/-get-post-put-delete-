/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './Data.css'

function Data() {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([]);
    const [file, setFile] = useState({})

    const MOCK_API_URL = process.env.REACT_APP_MOCK_API_URL;

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [url, setUrl] = useState(null)
    const [hidden, setHidden] = useState(false)

    const fetchResources = () => {
        fetch(`https://${MOCK_API_URL}.mockapi.io/truewatch/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false)
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    }

    useEffect(() => {
        fetchResources();
    }, []);

    const handleDelete = (id) => {
        fetch(`https://${MOCK_API_URL}.mockapi.io/truewatch/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchResources(); // fetch resources again after successful deletion
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    }

    const openUpdate = (e) => {
        setFile(e);
    }

    const handleEdit = (e) => {
        e.preventDefault()
        let el = e.target
        fetch(`https://${MOCK_API_URL}.mockapi.io/truewatch/${file.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                name: el.name.value,
                avatar: imageSrc
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchResources();
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    }


    const handlePlus = (e) => {
        e.preventDefault()
        let el = e.target
        fetch(`https://${MOCK_API_URL}.mockapi.io/truewatch/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                name: el.name.value,
                avatar: url
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchResources();
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
        console.log(file.id);
    }

    // if(loading){
    //     return <div>Loading</div>
    // }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log((file.size / (1024 * 1024)).toFixed(2) + 'MB');

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRrl = (e) => {
        setUrl(e.target.value);
    }

    useEffect(() => {
        users.map(e => (
            e.id >= 23 ? setHidden(true) : setHidden(false)
        ))
    })

    const styleBtn = {
        display: hidden === true ? 'none' : 'block'
    }

    return (
        <div>
            <h1>Users</h1>
            <h2>{loading === true ? "Loading ..." : ''}</h2>

            <button style={styleBtn} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target='#exampleModal' data-bs-whatever="@mdo">Qo`shish</button>

            <div className="modal fade" id='exampleModal' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action='#' onSubmit={handlePlus}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                    <input type="text" className="form-control" id="recipient-name" name='name' />
                                    <input type="file" onChange={handleFileChange} />
                                    {
                                        imageSrc && <img src={imageSrc} alt="Selected Image" />
                                    }
                                    <br />
                                    <span>Yoki url bering</span> <br />
                                    <input type="text" onChange={handleRrl} />
                                    {
                                        url && <img src={url} alt="url" />
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Qo`sh</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ul>
                {
                    users.map(e => (
                        <li key={e.id}>
                            <b>{e.name}</b>
                            <img src={e.avatar} alt="" />
                            <button onClick={() => openUpdate(e)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${e.id}`} data-bs-whatever="@mdo">Rename</button>

                            <div className="modal fade" id={`exampleModal${e.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">{e.name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form action='#' onSubmit={handleEdit}>
                                                <div className="mb-3">
                                                    <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                                    <input type="text" className="form-control" id="recipient-name" name='name' defaultValue={file.name} />
                                                    <input type="file" onChange={handleFileChange} />
                                                    {/* <img src={e.avatar ? e.avatar : ''} alt="avatar" /> */}
                                                    <span>Yoki url bering</span> <br />
                                                    <input type="text" onChange={handleRrl} />
                                                    {
                                                        url && <img src={url} alt="url" />
                                                    }
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-primary">Edit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(e.id)}>Delete</button>
                            <p>{e.id}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Data