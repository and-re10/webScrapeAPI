import React, { useState } from "react";
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


export default function Home(props) {

    const [ url, setUrl ] = useState(null);
    // const [ product, setProduct ] = useState(null);
    const [ magasin, setMagasin ] = useState(null);
    // const [ products, setProducts ] = useState(null);

    var {product, setProduct, setProducts, test} = props.data
        
    async function getAllproducts(){
        const response = await axios.get('http://192.168.0.156:8080/all-products');
        console.log(response.data);
        setProducts(response.data);
    }

    const scrapeProduct = async () => {
        const response = await axios.post('http://192.168.0.156:8080/add-product', {
        ProductURL: url,
        magasin: magasin
        });

        setProduct({
        prix: response.data.prix, 
        img: response.data.image,
        description: response.data.description
        });

        console.log(response.data)
    }

    return (
        <div className="App d-flex flex-column justify-content-center align-items-center">

        <div className="d-flex flex-column justify-content-center align-items-center w-100 mt-5">
            <h1>Web Scraper</h1>
            <button onClick={() => {
                test()
            }}>click</button>
            <div className="d-flex flex-column justify-content-center align-items-center w-75 my-5">
            <div className="mb-4 w-100">
                <input type="text" className="form-control w-100" placeholder="Note..." onChange={(e) => {
                setUrl(e.target.value);
                }}/>
                <select defaultValue="Magasin" className="custom-select w-100" id="select-magasin" onChange={(e) => {
                setMagasin(e.target.value);
                console.log(e.target.value)
                }}>
                <option>Magasin</option>
                <option value="amazone">Amazone</option>
                <option value="footlocker">FootLocker</option>
                </select>
            </div>
            
            {/* <p>{url}</p> */}
            <button className="btn btn-primary" onClick={() => {
                scrapeProduct();
                getAllproducts();
            }}>Go Scrape</button>
            </div>
            <div className=" w-75 d-flex flex-column justify-content-center align-items-center">
            <span style={{ fontWeight: 'bold' }}>Alexa : Amazone</span>
            <p className="w-100 m-3" style={{textAlign: 'center', wordBreak: 'break-all'}}>https://www.amazon.fr/echo-dot-3eme-generation-enceinte-connectee-avec-alexa-tissu-anthracite/dp/B07PHPXHQS/?_encoding=UTF8&pd_rd_w=q2xUl&pf_rd_p=672e9261-e57b-4ca7-a739-011bdc804371&pf_rd_r=QZY5M9736NQ9ETRS0HV0&pd_rd_r=847d27ef-42f5-49c6-8ced-0af6cbdb9506&pd_rd_wg=Fo5rT&ref_=pd_gw_unk</p>

            <span style={{ fontWeight: 'bold' }}>Chaise gaming : Amazone</span>
            <p className="w-100" style={{textAlign: 'center', wordBreak: 'break-all'}}>https://www.amazon.fr/dp/B08NTKQ15T/ref=cm_gf_aAN_iaag_d_p0_qd0_RVGpo5Hu59zRFf6hqRKN</p>

            <span style={{ fontWeight: 'bold' }}>Adidas Mini Backpack : Footlocker</span>
            <p className="w-100" style={{textAlign: 'center', wordBreak: 'break-all'}}>https://www.footlocker.be/fr/product/adidas-mini-backpack-unisexe-sacs/319641805380.html</p>

            <span style={{ fontWeight: 'bold' }}>Nike Zoom Freak 2 : Footlocker</span>
            <p className="w-100" style={{textAlign: 'center', wordBreak: 'break-all'}}>https://www.footlocker.be/fr/product/nike-zoom-freak-2-heren-schoenen/314102864304.html</p>
            </div>
            <p>{magasin}</p>
            {
            product ? (
                <div className="row my-5 py-3 justify-content-around align-items-center w-75 bg-primary rounded">
                    <div className="col-6">
                    <img className="w-100" src={product.img} alt="img product"/>
                    </div>
                    <div className=" col-6 d-flex flex-column align-items-start justify-content-center">
                    <h3 className="w-100" style={{fontSize: 15, color: "white",  wordBreak: 'break-all'}}>{product.prix}</h3>
                    <h4 className="w-100" style={{fontSize: 20, color: "white",  wordBreak: 'break-all'}}>{product.description}</h4>
                    </div>
                </div>
                ) : <div></div>
            }

        </div>
        </div>
    );
}