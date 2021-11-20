// DataBase local
const fs = require('fs');
const path = require('path');

const puppeteer = require('puppeteer');

const getProductName = () => {
    fs.readFile(path.resolve('Backend', 'database.json'), 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
    
        // parse JSON object
        const parseJson = JSON.parse(data.toString());
    
        console.log(parseJson.database.products)
        
    });
}

const checkProductExists = (product) => {
    fs.readFile(path.resolve('Backend', 'database.json'), 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
    
        // parse JSON object
        const parseJson = JSON.parse(data.toString());
        console.log("Description: " + product.description)
        let condition = false;
        for( let i = 0; i < parseJson.database.products.length; i++){
            if (parseJson.database.products[i].description === product.description){
                condition = true;
                // console.log("Product already exists")
                break;
            }

            // console.log(parseJson.database.users.products[i].product.description)
        }

        if ( condition === false ) {
            console.log("Product does not exist");
            addProduct(product)
        } else {
            console.log("Product already exist");
        }
        
    });
}

const addProduct = (product) => {
    fs.readFile(path.resolve('Backend', 'database.json'), 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
    
        // parse JSON object
        const parseJson = JSON.parse(data.toString());
    
        // print JSON object
        // console.log(parseJson);
    
        parseJson.database.products.push(product)
    
        // console.log(parseJson);
    
        fs.writeFileSync(path.resolve('Backend', 'database.json'), JSON.stringify(parseJson));
        
    });
}

const getAllProducts = () => {

    
    var data = fs.readFileSync(path.resolve('Backend', 'database.json'), 'utf-8')
    data = JSON.parse(data.toString());
    // console.log(data.database);

    return data.database.products ;

}

// const updatePrice = async (url) => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     const [el] = await page.$x('//*[@id="price_inside_buybox"]');

//     var txt;
//     var prix;
//     if(el === undefined){
//         const [el2] = await page.$x('//*[@id="newBuyBoxPrice"]');
//         txt = await el2.getProperty('textContent');
//         prix = (await txt.jsonValue()).trim();
//         prix = Number(prix.replace(',', '.').replace('€', '').trim());
//     } else {
//         txt = await el.getProperty('textContent');
//         prix = (await txt.jsonValue()).trim();
//         prix = Number(prix.replace(',', '.').replace('€', '').trim());
//     }

//     var data = fs.readFileSync(path.resolve('Backend', 'student.json'), 'utf-8')
    
//     // parse JSON object
//     data = JSON.parse(data.toString());

//     // print JSON object
//     var product = data.database.users.products.filter(product => product.prodURL === url ? true : false);
//     console.log(product[0]);

//     product[0].prixActuel = prix;
//     product[0].allPrix.push(prix);
//     console.log(product);

//     const diff = product[0].prixActuel - product[0].allPrix[0];
//     const pourcentage = (diff * 100)/product[0].allPrix[0];

//     console.log(pourcentage);
//     console.log(data.database.users.products);
    
//     fs.writeFileSync(path.resolve('Backend', 'student.json'), JSON.stringify(data));

//     browser.close();
    
//     return product
        

// }

const updatePrice = async () => {
    
    var data = fs.readFileSync(path.resolve('Backend', 'database.json'), 'utf-8')
    
    // parse JSON object
    data = JSON.parse(data.toString());
    prod = data.database.products;
    // console.log(prod.length)

    await (async () => {
        // console.log("test out for")
        for (let i = 0; i < prod.length; i++){
            // console.log("test")
        // }
        // await data.database.users.products.forEach(async prod => {
            // console.log(product.prodURL);
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(prod[i].prodURL);

            

            if(prod[i].magasin === "amazone"){
                const [el] = await page.$x('//*[@id="price_inside_buybox"]');
                var txt;
                var prix;
                if(el === undefined){
                    const [el2] = await page.$x('//*[@id="newBuyBoxPrice"]');
                    txt = await el2.getProperty('textContent');
                    prix = (await txt.jsonValue()).trim();
                    prix = Number(prix.replace(',', '.').replace('€', '').trim());
                } else {
                    txt = await el.getProperty('textContent');
                    prix = (await txt.jsonValue()).trim();
                    prix = Number(prix.replace(',', '.').replace('€', '').trim());
                }

            } else if (prod[i].magasin === "footlocker"){
                const [el] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]/span[2]');
                var txt;
                var prix;
                if(el === undefined){
                    // console.log("test")
                    const [el2] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]');
                    // if (el2 !== undefined){
                    txt = await el2.getProperty('textContent');
                    prix = (await txt.jsonValue()).trim();
                    console.log(prix)
                    prix = Number(prix.replace(',', '.').replace('€', '').trim());
                    console.log(prix);

                    if (isNaN(prix)) {
                        const [el21] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]');
                        txt = await el21.getProperty('textContent');
                        prix = (await txt.jsonValue()).trim();
                        // console.log(prix)
                        prix = Number(prix.replace(',', '.').replace('€', '').trim());
                    }
                    // };
                    
                    // if (isNaN(prix)) {
                    //     const [el21] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]');
                    //     txt = await el21.getProperty('textContent');
                    //     prix = (await txt.jsonValue()).trim();
                    //     // console.log(prix)
                    //     prix = Number(prix.replace(',', '.').replace('€', '').trim());
                    // }
                    // console.log(prix)
                } else {
                    txt = await el.getProperty('textContent');
                    prix = (await txt.jsonValue()).trim();
                    console.log(prix)
                    prix = Number(prix.replace(',', '.').replace('€', '').trim());
                    console.log(prix)
                }
            } else {
                return 'mafasin non trouvable';
            }

            // const [el] = await page.$x('//*[@id="price_inside_buybox"]');

            // var txt;
            // var prix;
            // if(el === undefined){
            //     const [el2] = await page.$x('//*[@id="newBuyBoxPrice"]');
            //     txt = await el2.getProperty('textContent');
            //     prix = (await txt.jsonValue()).trim();
            //     prix = Number(prix.replace(',', '.').replace('€', '').trim());
            // } else {
            //     txt = await el.getProperty('textContent');
            //     prix = (await txt.jsonValue()).trim();
            //     prix = Number(prix.replace(',', '.').replace('€', '').trim());
            // }

            

            // print JSON object
            var product = data.database.products.filter(product => product.prodURL === prod[i].prodURL ? true : false);

            // console.log(product[0]);

            product[0].prixActuel = prix;
            product[0].allPrix.push(prix);
            // console.log(product);

            const diff = product[0].prixActuel - product[0].allPrix[0];
            const pourcentage = (diff * 100)/product[0].allPrix[0];

            // console.log(pourcentage);
            // console.log(data.database.users.products);
            
            

            browser.close();
        };
    })()

    console.log(data.database.products);
    
    fs.writeFileSync(path.resolve('Backend', 'database.json'), JSON.stringify(data));
    
    return data.database.products;
        

}

module.exports = {getProductName, checkProductExists, addProduct, getAllProducts, updatePrice};
