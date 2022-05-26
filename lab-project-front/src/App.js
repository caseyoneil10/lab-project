import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'

const App = () => {

  return (
   <main>
     <h1>Best Albums of All Time</h1>
     <section>
       <form>
         <input placeholder='Image Link' type='text'/><br/>
         <input placeholder='Album Name' type='text'/><br/>
         <input placeholder='Artist Name' type='text'/><br/>
         <input placeholder='Genre' type='text'/><br/>
         <input placeholder='Year Released' type='text'/><br/>
         <input type = "submit" value='Create Album'/><br/>
       </form>
      </section>
   </main>

  );
}

export default App;
