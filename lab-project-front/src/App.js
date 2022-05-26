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
    const [newShowEdit, setNewShowEdit] = useState(false)
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
          show: newShowEdit,
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
          year: newYear,
          show: newShowEdit,
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
  const show = (event, albumData) => {
  event.preventDefault()
    axios
      .put(
        `http://localhost:3000/albums/${albumData._id}`,
        {
          name: albumData.name,
          artist: albumData.artist,
          genre: albumData.genre,
          image: albumData.image,
          year: albumData.year,
          show: !albumData.show,
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
   <main className="container">
     <h2>Best Albums of All Time</h2>
     <h4>Add an Album to the List</h4>
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
      <section  className='container'>
        <h2>Album Catalog</h2>
        <hr/>
        {album.map((albums) => {
            return <div key={albums._id}>
              <div className='card'>
              <h4>{albums.artist}</h4>
              <h5>{albums.name}</h5>
              <img src= {albums.image}/>
              <h5>{albums.genre}</h5>
              <h5>{albums.year}</h5>

              <button onClick={(event) => {
                handleDelete(albums)
              }}>Delete Album</button>

              <button onClick={(event) => {
                  show(event, albums)
              } }>Edit Album</button>
              <hr/>
              </div>
              {albums.show ? <form onSubmit={(event) => {
                  handleAlbumUpdate(event, albums)
              }}>
                <input defaultValue={albums.name} onChange={handleNewAlbumName} type='text'></input>
                <input defaultValue={albums.artist} onChange={handleNewArist} type='text'></input>
                <input defaultValue={albums.genre} onChange={handleNewGenre} type='text'></input>
                <input defaultValue={albums.image} onChange={handleNewImage} type='text'></input>
                <input defaultValue={albums.year} onChange={handleNewYear} type='text'></input>
                <input type='submit' value='Submit Changes'/>
              </form> : null }
            </div>

        })}
      </section>
   </main>


  )
}

export default App;
