var express = require('express');
var app = express();

var jwt = require('jsonwebtoken');

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const puppeteer = require('puppeteer');

// DataBase local
const fs = require('fs');
const path = require('path');


const XPath = [
    {
        nom: "footlocker",
        prix: [
            '//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]/span[2]',
            '//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]'
        ],
        image: [
            '//*[@id="main"]/div/div[2]/div/section/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div/span/img'
        ],
        description: [
            '//*[@id="pageTitle"]/span/span[1]'
        ],
    },
    {
        nom: "amazone",
        prix: [
            '//*[@id="corePrice_desktop"]/div/table/tbody/tr[1]/td[2]/span[1]/span[1]',
            '//*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2]'
        ],
        image: [
            '//*[@id="landingImage"]'
        ],
        description: [
            '//*[@id="productTitle"]'
        ],
    }
]

function getXPaths(magasin){
    var data = XPath.find(mgs => mgs.nom === magasin)
    // data.xpaths.forEach(xpath => {
    //     console.log(xpath)
    // });

    return data
}

// getXPaths("amazone");

async function scrapeAllProducts(url, magasin){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const prodURL = url;
    const xpaths = getXPaths(magasin);
    console.log(xpaths)
    // var el = await page.$x(xpaths[0]);
    // console.log(el)
    if(xpaths){
        for (const xpath of xpaths.prix){
        // await xpaths.forEach(async xpath => {
            // console.log(xpath)
            const [el] = await page.$x(xpath);
            // console.log(el)
        
            if( el !== undefined) {
                // get price
                var txt = await el.getProperty('textContent');
                console.log(await txt.jsonValue())
                var prix = (await txt.jsonValue()).trim();
                prix = Number(prix.replace(',', '.').replace('€', '').replace(/\s+/g, '').trim());
                console.log(prix)
                // browser.close(); 

                break ;
            }
        }

        for (const xpath of xpaths.image){

            // get image
            const [el3] = await page.$x(xpath);// //*[@id="landingImage"]
            if (el3 !== undefined){
                const src = await el3.getProperty('src');
                const image = (await src.jsonValue()).trim();
                console.log(image);
                break ;
            }
            

        }

        for (const xpath of xpaths.description){
            // get description
            const [el4] = await page.$x(xpath);// //*[@id="productTitle"]
            if(el4 !== undefined){
                const txtDesc = await el4.getProperty('textContent');
                const description = (await txtDesc.jsonValue()).trim();
                console.log(description);
                break ;
            }
            
        }

        const prixActuel = prix;
        const allPrix = [prix];
    }
    browser.close();
    
    return {prodURL, prix, image, description, prixActuel, allPrix}
}


async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const prodURL = url;

    // .replace(/\n/g, '') == ok
    // .trim(); == ok
    // 'innerText' == ok

    // const [el] = await page.$x('//*[@id="price_inside_buybox"]');
    // const txt = el ? await el.getProperty('textContent') :  await page.$x('//*[@id="newBuyBoxPrice"]').getProperty('textContent')
    // const prix = (await txt.jsonValue()).trim();
    const [el] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr[1]/td[2]/span[1]/span[1]');//*[@id="priceblock_ourprice"]//*[@id="newBuyBoxPrice"]//*[@id="price_inside_buybox"]
    // //*[@id="corePrice_feature_div"]/div/span/span[2]
    // //*[@id="corePrice_desktop"]/div/table/tbody/tr[1]/td[2]/span[1]/span[2] -> first
    // //*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2] -> second
    // //*[@id="corePrice_desktop"]/div/table/tbody/tr[1]/td[2]/span[1]/span[1] -> third
    //*[@id="corePrice_desktop"]/div/table/tbody/tr[1]/td[2]/span[1]/span[2]
    // console.log(el)
    var txt;
    var prix;
    if(el === undefined){
        // console.log("test")
        const [el2] = await page.$x('//*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2]'); // //*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2] - //*[@id="newBuyBoxPrice"]
        txt = await el2.getProperty('textContent');
        prix = (await txt.jsonValue()).trim();
        prix = Number(prix.replace(',', '.').replace('€', ''), replace(/\s+/g, '').trim());
        console.log(prix)
    } else {
        txt = await el.getProperty('textContent');
        console.log(await txt.jsonValue())
        prix = (await txt.jsonValue()).trim();
        prix = Number(prix.replace(',', '.').replace('€', '').replace(/\s+/g, '').trim());
        console.log(prix)
    }

    const [el3] = await page.$x('//*[@id="landingImage"]');// //*[@id="landingImage"]
    const src = await el3.getProperty('src');
    const image = (await src.jsonValue()).trim();

    const [el4] = await page.$x('//*[@id="productTitle"]');// //*[@id="productTitle"]
    const txtDesc = await el4.getProperty('textContent');
    const description = (await txtDesc.jsonValue()).trim();

    const prixActuel = prix;
    const allPrix = [prix];
    

    

    browser.close();
    // console.log({url, prix, image, description});
    return {prodURL, prix, image, description, prixActuel, allPrix} ;
}

async function scrapeFootLocker(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const prodURL = url;
    // console.log(prodURL);
    //*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]/span[2]
    const [el] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]/span[2]');//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]
    // Prix normal
    //*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]

    // Promotion
    //*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]/span[2]

    // console.log(el)
    var txt;
    var prix;
    if(el === undefined){
        // console.log("test")
        const [el2] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]');
        txt = await el2.getProperty('textContent');
        prix = (await txt.jsonValue()).trim();
        prix = Number(prix.replace(',', '.').replace('€', '').trim());
        // console.log(prix)
    } else {
        txt = await el.getProperty('textContent');
        prix = (await txt.jsonValue()).trim();
        prix = Number(prix.replace(',', '.').replace('€', '').trim());
        // console.log(prix)
    }

    //*[@id="main"]/div/div[2]/div/section/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div/span/img
    const [el3] = await page.$x('//*[@id="main"]/div/div[2]/div/section/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div/span/img');
    const src = await el3.getProperty('src');
    const image = (await src.jsonValue()).trim();

    // console.log(image);

    //*[@id="pageTitle"]/span/span[1]
    const [el4] = await page.$x('//*[@id="pageTitle"]/span/span[1]');
    const txtDesc = await el4.getProperty('textContent');
    const description = (await txtDesc.jsonValue()).trim();

    // console.log(description);

    const prixActuel = prix;
    const allPrix = [prix];

    browser.close();
    return {prodURL, prix, image, description, prixActuel, allPrix} ;

    
}
const {getProductName, checkProductExists, addProduct, getAllProducts, updatePrice} = require("./controlers/productsController");
// const getProductName = () => {
//     fs.readFile(path.resolve(__dirname, 'student.json'), 'utf-8', (err, data) => {
//         if (err) {
//             throw err;
//         }
    
//         // parse JSON object
//         const parseJson = JSON.parse(data.toString());
    
//         console.log(parseJson.database.users.products)
        
//     });
// }

// const checkProductExists = (product) => {
//     fs.readFile(path.resolve(__dirname, 'student.json'), 'utf-8', (err, data) => {
//         if (err) {
//             throw err;
//         }
    
//         // parse JSON object
//         const parseJson = JSON.parse(data.toString());
//         console.log("Description: " + product.description)
//         let condition = false;
//         for( let i = 0; i < parseJson.database.users.products.length; i++){
//             if (parseJson.database.users.products[i].product.description === product.description){
//                 condition = true;
//                 // console.log("Product already exists")
//                 break;
//             }

//             // console.log(parseJson.database.users.products[i].product.description)
//         }

//         if ( condition === false ) {
//             console.log("Product does not exist");
//             addProduct(product)
//         } else {
//             console.log("Product already exist");
//         }
        
//     });
// }

// const addProduct = (product) => {
//     fs.readFile(path.resolve(__dirname, 'student.json'), 'utf-8', (err, data) => {
//         if (err) {
//             throw err;
//         }
    
//         // parse JSON object
//         const parseJson = JSON.parse(data.toString());
    
//         // print JSON object
//         console.log(parseJson);
    
//         parseJson.database.users.products.push({product})
    
//         console.log(parseJson);
    
//         fs.writeFileSync(path.resolve(__dirname, 'student.json'), JSON.stringify(parseJson));
        
//     });
// }

app.post('/add-product', async function(req, res){

    const { magasin, ProductURL } = req.body;
    
    try {
        // const magasin = req.body.magasin;
        // const productURL = req.body.ProductURL
        
        console.log(ProductURL);
        // nouvelle fonction pour tous les magasins
        product = await scrapeAllProducts(ProductURL);
        checkProductExists(product);

        // var product;
        // if (magasin === "amazone") {
        //     console.log(magasin);
        //     product = await scrapeProduct(ProductURL);
        //     checkProductExists(product);

        // } else if (magasin === "footlocker") {
        //     console.log(magasin);
        //     product = await scrapeFootLocker(ProductURL);
        //     checkProductExists(product);
        //     // console.log(product);
        // }

        // test

        product.magasin = magasin;
        
        res.send(product);
    } catch (error) {
        // console.error(error)
    }
}); 

app.get('/all-products', (req, res) => {
    try {
        const products = getAllProducts();   
        console.log(products);
        res.send(products)
    } catch (error) {
        console.error(error);
    }
});

app.get('/update-price', async (req, res) => {
    try {
        const prixUpdate = await updatePrice();
        console.log(prixUpdate)
        res.send(prixUpdate);
    } catch (error){
        console.error(error);
    }
})

app.get('/test-json', (req, res) => {
    var date
    // setTimeout(() => {
        date = new Date();
    // }, 1000);
    
    res.send(date);
})

// User Backend

const readAllcontactsFromUserDB = () => {
    var data = fs.readFileSync(path.resolve('Backend', 'database.json'), 'utf-8');
    var contacts;
    
    // parse JSON object
    data = JSON.parse(data.toString());
    data.database.users.find(user => {
        if (user.email === "andre@test.com"){
            console.log(user);
            contacts = user.contacts;
            // user.contacts.push(contact);
        }
        return user.email === "andre@test.com"
    });
    console.log(contacts)
        
    return contacts;
}

const addContactToUserDB = () => {
    fs.readFile(path.resolve('Backend', 'database.json'), 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
    
        // parse JSON object
        const parseJson = JSON.parse(data.toString());
    
        // print JSON object
        // console.log(parseJson);
        var contact = {
            nom: "Vieira",
            prenom: "Vanessa",
            email: "vanessa@test.com",
            phone: "0123456789"
        }

        parseJson.database.users.find(user => {
            if (user.email === "andre@test.com"){
                console.log(user);
                user.contacts.push(contact);
            }
            return user.email === "andre@test.com"
        });
        

        // console.log(parseJson);
    
        fs.writeFileSync(path.resolve('Backend', 'database.json'), JSON.stringify(parseJson));
        
    });
}

const createUserToDB = (email, pass) => {
    fs.readFile(path.resolve('database.json'), 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
    
        // parse JSON object
        const parseJson = JSON.parse(data.toString());
    
        // print JSON object
        // console.log(parseJson);
        var user = {
            nom: "Santos",
            prenom: "André",
            email: "andre@test.com",
            password: "0123456789",
            phone: "0123456789",
            contacts: []
        }
        console.log(parseJson.database.users);
        if(parseJson.database.users){
            parseJson.database.users.push(user);
        } else {
            parseJson.database.users = [];
            parseJson.database.users.push(user);
        }

        // console.log(parseJson);
    
        fs.writeFileSync(path.resolve('Backend', 'database.json'), JSON.stringify(parseJson));
        
    });
}

const login = (email, pass) => {

    var data = fs.readFileSync(path.resolve('Backend', 'database.json'), 'utf-8');
    
    // parse JSON object
    data = JSON.parse(data.toString());

    const user = data.database.users.find(user => user.email === email && user.password === pass);
    if (user){
        const stringUser = JSON.stringify(user)
        console.log({user: stringUser});

        var response = {
            msg: "User trouvé",
            user: user
        }

        return response
    }

    return {msg: "User non trouvé"}
}

app.get('/get-user-contacts', (req, res) => {
    try {
       const data = readAllcontactsFromUserDB(); 
       res.send(data);
    } catch (error) {
        console.error(error);
    }
    
    
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    try {
        const user = login(email, password);
        const token = jwt.sign(user, ' mon_mot_de_passe')
        res.send(token);
    } catch (error) {
        console.error(error);
    }

    

})

app.get('/create-user', (req, res) => {
    const { email, password } = req.body;
    createUserToDB(email, password);
})

app.get('/add-contact', (req, res) => {
    const { email, password } = req.body;
    addContactToUserDB(email, password);
})

// scrapeProduct('https://www.amazon.fr/echo-dot-3eme-generation-enceinte-connectee-avec-alexa-tissu-anthracite/dp/B07PHPXHQS/?_encoding=UTF8&pd_rd_w=q2xUl&pf_rd_p=672e9261-e57b-4ca7-a739-011bdc804371&pf_rd_r=QZY5M9736NQ9ETRS0HV0&pd_rd_r=847d27ef-42f5-49c6-8ced-0af6cbdb9506&pd_rd_wg=Fo5rT&ref_=pd_gw_unk')

app.listen(8080, '0.0.0.0', function () {
    console.log('Listening to port: ' + 8080)
});