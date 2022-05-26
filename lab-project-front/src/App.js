import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'

const App = () => {

    const [newAlbumName, setNewAlbumName] = useState()
    const [newArtist, setNewArtist] = useState()
    const [newGenre, setNewGenre] = useState()
    const [newImage, setNewImage] = useState()
    const [newYear, setNewYear] = useState()
    const [album, setAlbum] = useState([])

    const handleNewAlbumName = (event) => {
        setNewAlbumName(event.target.value)
    }
    const handleNewArist = (event) => {
        setNewArtist(event.target.value)
    }
    const handleNewGenre = (event) => {
        setNewGenre(event.target.value)
    }
    const handleNewImage = (event) => {
        setNewImage(event.target.value)
    }
    const handleNewYear = (event) => {
        setNewYear(event.target.value)
    }

    const handleNewAlbum = (event) => {
      event.preventDefault()
      axios.post(
        'http://localhost:3000/albums',
        {
          name: newAlbumName,
          artist: newArtist,
          genre: newGenre,
          image: newImage,
          year: newYear,
        }
      ).then(() => {
          axios.get('http://localhost:3000/albums').then((response) => {
                setAlbum(response.data)
          })
      })
  }

  const handleDelete = (albumsData) => {
          axios
          .delete(`http://localhost:3000/albums/${albumsData._id}`)
          .then(() => {
            axios
              .get('http://localhost:3000/albums')
              .then((response) => {
                  setAlbum(response.data)
            })
          })
        }

  const handleAlbumUpdate = (event, albumData) => {
  event.preventDefault()
    axios
      .put(
        `http://localhost:3000/albums/${albumData._id}`,
        {
          name: newAlbumName,
          artist: newArtist,
          genre: newGenre,
          image: newImage,
          year: newYear
        }
    )
    .then(() => {
      axios
        .get('http://localhost:3000/albums')
        .then((response) => {
            setAlbum(response.data)
        })
    })
  }



  useEffect(() => {
        axios.get('http://localhost:3000/albums').then((response) => {
          setAlbum(response.data)
        })

      }, [])

  return (
   <main>
     <h1>Best Albums of All Time</h1>
     <section>
       <form onSubmit={handleNewAlbum}>
         <input placeholder='Image Link' onChange={handleNewImage} type='text'/><br/>
         <input placeholder='Album Name'  onChange={handleNewAlbumName} type='text'/><br/>
         <input placeholder='Artist Name'  onChange={handleNewArist} type='text'/><br/>
         <input placeholder='Genre' onChange={handleNewGenre} type='text'/><br/>
         <input placeholder='Year Released' onChange={handleNewYear} type='number'/><br/>
         <input type = "submit" value='Create Album'/><br/>
       </form>
      </section>
      <section>
        <h2>Album Catalog</h2>
        {album.map((albums) => {
            return <>
              <img src= {albums.image}/>
              {albums.name}
              {albums.artist}
              {albums.genre}
              {albums.year}
              <button onClick={(event) => {
                handleDelete(albums)
              }}>Delete Album</button>
              
              <form onSubmit={(event) => {
                  handleAlbumUpdate(event, albums)
              }}>
                <input defaultValue={albums.name} onChange={handleNewAlbumName} type='text'></input>
                <input defaultValue={albums.artist} onChange={handleNewArist} type='text'></input>
                <input defaultValue={albums.genre} onChange={handleNewGenre} type='text'></input>
                <input defaultValue={albums.image} onChange={handleNewImage} type='text'></input>
                <input defaultValue={albums.year} onChange={handleNewYear} type='text'></input>
                <input type='submit' value='Submit Changes'/>
              </form>
            </>

        })}
      </section>
   </main>


  )
}

export default App;
