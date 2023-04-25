import './App.css';
import React from 'react';
import About from "./components/About/About";
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage/LandingPage";
import Home from './components/Home/Home';
import DogDetail from './components/DogDetail/DogDetail';
import DogCreate from './components/DogCreate/DogCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path='/breeds/:id' component={DogDetail}></Route>
        <Route exact path='/home' component={Home}></Route>
        <Route path='/dogcreate' component={DogCreate}></Route>  
        <Route path='/about' component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
