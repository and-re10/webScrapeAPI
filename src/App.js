import React, { useState } from "react";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./components/home";
import MyProduct from "./components/myProducts";

// Objetivo desta aplicacao:
//    1 -> Procurar um produto na amazone
//    2 -> Copiar o link do produto
//    3 -> Colar o link do produto na barra de pesquisas
//    4 -> Clicar no botao "Go Scape"
//    5 -> O produto vais aparecer com o preço, a descriçao e a image
//    6 -> Se o produto baixar o preço, vai receber um email e uma notificacao em como o produto baixou o preço


function App() {

  const [ product, setProduct ] = useState(null);
  // const [ magasin, setMagasin ] = useState(null);
  const [ products, setProducts ] = useState(null);

  const test = () => {
    console.log("test props")
  }
  var data = {
    product: product,
    setProduct: setProduct,
    products: products,
    setProducts: setProducts,
    test: () => test()
  }

  return (
    <Router>
      <div>
        <nav>
          <ul className="d-flex justify-content-center">
            <li className="mx-3">
              <Link className="router-link" to="/home">Home</Link>
            </li>
            <li>
              <Link className="router-link" to="/myproduct">My Product</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <Home data={data}/>
          </Route>
          <Route path="/myproduct">
            <MyProduct data={data} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
