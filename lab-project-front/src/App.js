import logo from './logo.svg';
import './App.css';


const App = () => {
  return (
   <main>
     <h1>Tops Ten '10' albums of all time</h1>
     <section>
       <form>
        Image:<img src='<input type="text"/>'/><br/>
        Name: <input type='text'/><br/>
        Artist: <input type='text'/><br/>
        Genre: <input type='text'/><br/>
        year realeased: <input type='text'/><br/>
        <input type = "submit" value="Creat Album"/><br/>
       </form>
      </section>
   </main>
  );
}

export default App;
