
import React, { useEffect } from "react";
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import axios from "axios";



// Objetivo desta aplicacao:
//    1 -> Procurar um produto na amazone
//    2 -> Copiar o link do produto
//    3 -> Colar o link do produto na barra de pesquisas
//    4 -> Clicar no botao "Go Scape"
//    5 -> O produto vais aparecer com o preço, a descriçao e a image
//    6 -> Se o produto baixar o preço, vai receber um email e uma notificacao em como o produto baixou o preço


export default function MyProduct(props) {

    // const [ scroll, setScroll ] = useState(0);
    // const [ count, setCount ] = useState(0);

    //   const [ product, setProduct ] = useState(null);
    //   const [ products, setProducts ] = useState(null);

    var test = 10;

   var {products, setProducts} = props.data;

    useEffect(() => {
        getAllproducts();

        return () => console.log("stop axios");
    }, [])

    useEffect(() => {
        updateAllProducts()
        // let secTimer = setInterval(() => {
        //     console.log(products)
        //     // updateAllProducts()
        // }, 3000)
        

        return () => {
            // clearInterval(secTimer);
            console.log("Out of My Product Page");
        }
    }, [])

    const updateAllProducts = async () => {
        const response = await axios.get(`http://192.168.0.156:8080/update-price`);
        console.log(response.data);
        setProducts(response.data);
    }

    const getAllproducts = async () => {
        const response = await axios.get('http://192.168.0.156:8080/all-products');
        console.log(response.data);
        setProducts(response.data);
    }    
    
    const colorChange = (color) => {
        return {"backgroundColor": color}
    }

    const textLimit = (text) => {
        var textLimited;
        if (text.length >= 30){
            textLimited = text.substr(0, 30);
            return textLimited;
        } 

        return text;
    }

    const reduction = (prod) => {
        const diff = prod.prixActuel - prod.allPrix[0];
        const pourcentage = (diff * 100)/prod.allPrix[0];

        if(prod.prixActuel < prod.allPrix[0]){
            return <span className="text-danger">({pourcentage.toFixed(2)}%)</span>
        } else if(prod.prixActuel > prod.allPrix[0]) {
            return <span className="text-success">(+{pourcentage.toFixed(2)}%)</span>
        }
    }

    return (
        <div className="App d-flex flex-column justify-content-center align-items-center">
            {/* <div id="carousel">
                <button className="carousel-before" onClick={(elem) => {
                console.log("Before");
                let carousel = document.querySelector('#carousel');
                let nb;
                // if (scroll === 0) {
                //   nb = scroll - 380;
                // }
                
                if (scroll > 0){
                    nb = scroll - 400;
                    setScroll(scroll - 400);
                    console.log(nb);
                    carousel.scrollLeft = nb;
                };
                // console.log(scroll);

                
                }}>Before</button>
                <button className="carousel-after" onClick={() => {
                console.log("After");
                let carousel = document.querySelector('#carousel');
                let nb;

                if (scroll < 1600){
                    nb = scroll + 400;
                    setScroll(scroll + 400);
                    console.log(nb);
                    carousel.scrollLeft = nb;
                };
                // console.log(nb);

                
                }}>After</button>
                <div className="col" style={colorChange("red")}></div>
                <div className="col" style={colorChange("orange")}></div>
                <div className="col" style={colorChange("yellow")}></div>
                <div className="col" style={colorChange("green")}></div>
                <div className="col" style={colorChange("lightgreen")}></div>
                <div className="col" style={colorChange("lightblue")}></div>
                <div className="col" style={colorChange("blue")}></div>
                <div className="col" style={colorChange("purple")}></div>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={() => {
                setCount(count - 1);
                }}>-</button>
                <button onClick={() => {
                setCount(count + 1)
                }}>+</button>
                <span>=</span>
                <span>{scroll}</span>
            </div> */}

        <div className="d-flex flex-column justify-content-center align-items-center w-100 mt-5">
            <h1>Web Scraper</h1>
            <div className="carousel" style={{height: 320}}>
                { products?.map((elem, i) => {
                    return (
                        <div key={i} className="product" style={colorChange("lightblue")}>
                            <div className="product-top">
                                <img className="h-100 w-100 m-auto"  src={elem.image} alt="img product"/>
                            </div>
                            <div className="product-bottom">
                                <div className="w-100">
                                    <span id="prix">{elem.prixActuel} {reduction(elem)}</span>
                                </div>
                                <div className="w-100 my-2">
                                    <p id="description">{textLimit(elem.description)}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <div className="w-100"> */}
                {products?.map((elem, i) => {
                    return (
                        <div key={i} className="w-100">
                            <h2>{elem.description}</h2>
                            <div className="carousel" style={{height: elem.prix*4}}>
                                {elem.allPrix?.map((prix, j) => {
                                    return (
                                        <div key={j} className="graph-col" style={{height: prix, width: 100, backgroundColor: "blue", marginLeft: 20}}></div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                
                
            {/* </div> */}
            
            
            <div className="d-flex flex-wrap my-5 py-3 justify-content-start align-items-strat w-75 bg-primary rounded">
            {/* <p>{products}</p> */}
            { products?.map((elem, i) => {
                return (
                <div key={i} className="col-lg-3 col-md-4 col-sm-12 row my-2 mx-4 py-3 justify-content-around align-items-center bg-danger rounded" style={{height: 200}}>
                    <div className="col-6">
                    <img className="w-100" src={elem.image} alt="img product"/>
                    </div>
                    <div className=" col-6 d-flex flex-column align-items-start justify-content-center">
                    <h3 className="w-100" style={{fontSize: 12, color: "white",  wordBreak: 'break-all'}}>{elem.prix}</h3>
                    <h4 className="w-100" style={{fontSize: 10, color: "white",  wordBreak: 'break-all'}}>{elem.description}</h4>
                    </div>
                </div>
                )
            })}
            
            </div>

        </div>
        </div>
    );
}