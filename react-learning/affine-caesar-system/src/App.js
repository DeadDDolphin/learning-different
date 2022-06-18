import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainComponent from './components/MainComponent';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <MainComponent></MainComponent>
    </div>
  );
}

export default App;
