// const puppeteer = require('puppeteer');

// async function scrapeProduct(url){
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     // .replace(/\n/g, '') == ok
//     // .trim(); == ok
//     // 'innerText' == ok

//     const [el] = await page.$x('//*[@id="price_inside_buybox"]');//*[@id="priceblock_ourprice"]//*[@id="newBuyBoxPrice"]//*[@id="price_inside_buybox"]
//     // console.log(el)
//     var txt;
//     var prix;
//     if(el === undefined){
//         // console.log("test")
//         const [el2] = await page.$x('//*[@id="newBuyBoxPrice"]');
//         txt = await el2.getProperty('textContent');
//         prix = (await txt.jsonValue()).trim();
//         prix = Number(prix.replace(',', '.').replace('€', '').trim());
//         console.log(prix)
//     } else {
//         txt = await el.getProperty('textContent');
//         prix = (await txt.jsonValue()).trim();
//         prix = Number(prix.replace(',', '.').replace('€', '').trim());
//         console.log(prix)
//     }
//     // const txt = el === undefined ? await page.$x('//*[@id="newBuyBoxPrice"]').getProperty('textContent') : await el.getProperty('textContent');
    
    

//     const [el3] = await page.$x('//*[@id="landingImage"]');//*[@id="landingImage"]//*[@id="landingImage"]
//     const src = await el3.getProperty('src');
//     const image = (await src.jsonValue()).trim();

//     console.log(image)

//     const [el4] = await page.$x('//*[@id="productTitle"]');//*[@id="productTitle"]//*[@id="productTitle"]
//     const txtDesc = await el4.getProperty('textContent');
//     const description = (await txtDesc.jsonValue()).trim();
    
//     console.log(description)
    

//     browser.close();

//     // console.log(prix) ;
// }

// // scrapeProduct("https://www.amazon.fr/Harry-Potter-lInt%C3%A9grale-Sorciers-Rowling/dp/B00K3OM4E8/?_encoding=UTF8&pd_rd_w=5gdUL&pf_rd_p=9c892acd-7567-4862-a77a-6ab6f5960ea7&pf_rd_r=G96BBDVPXYJDE3A29K1X&pd_rd_r=3e19327a-38e8-4349-9fe6-ebc417414f83&pd_rd_wg=BxU5Z&ref_=pd_gw_crs_zg_bs_405322")

// async function scrapeFootLocker(url){
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     //*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]/span[2]
//     const [el] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]/span[2]');
//     // Prix normal
//     //*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]

//     // Promotion
//     //*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]/span[2]

//     console.log(el)
//     var txt;
//     var prix;
//     if(el === undefined){
//         // console.log("test")
//         const [el2] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]');
//         txt = await el2.getProperty('textContent');
//         prix = (await txt.jsonValue()).trim();
//         prix = Number(prix.replace(',', '.').replace('€', '').trim());
//         console.log(prix)
//     } else {
//         txt = await el.getProperty('textContent');
//         prix = (await txt.jsonValue()).trim();
//         prix = Number(prix.replace(',', '.').replace('€', '').trim());
//         console.log(prix)
//     }

//     //*[@id="main"]/div/div[2]/div/section/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div/span/img
//     const [el3] = await page.$x('//*[@id="main"]/div/div[2]/div/section/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div/span/img');
//     const src = await el3.getProperty('src');
//     const image = (await src.jsonValue()).trim();

//     console.log(image);

//     browser.close();
// }

// scrapeFootLocker("https://www.footlocker.be/fr/product/nike-max-95-essential-homme-chaussures/314215236804.html");

// const fs = require('fs');
// const path = require('path');

// let data = { 
//     name: 'Mike',
//     age: 23, 
//     gender: 'Male',
//     department: 'English',
//     car: 'Honda' 
// };

// Lecture du fichier json
// fs.readFile(path.resolve(__dirname, 'student.json'), 'utf-8', (err, data) => {
//     if (err) {
//         throw err;
//     }

//     // parse JSON object
//     const parseJson = JSON.parse(data.toString());

//     // print JSON object
//     console.log(parseJson);

//     // parseJson.database = {
//     //     users: {}
//     // };

//     // for( let i = 0; i < 3; i++ ){
//     //     parseJson.table.push({
//     //         id: i,
//     //         name: "André"
//     //     })
//     // }

//     // console.log(parseJson);

//     // fs.writeFileSync(path.resolve(__dirname, 'student.json'), JSON.stringify(parseJson));
    
// });

// console.log(dataBase)
// let data;

// for( let i = 0; i < 4; i++) {
//     // dataBase.user = {
//     //     id: i,
//     //     name: "André"
//     // }

//     console.log(dataBase);
//     // data = { 
//     //     name: 'Mike',
//     //     age: i, 
//     //     gender: 'Male',
//     //     department: 'English',
//     //     car: 'Honda' 
//     // };

//     // fs.writeFileSync(path.resolve(__dirname, 'student.json'), JSON.stringify(DB));
// }

// Ecriture du fichier json
// fs.writeFileSync(path.resolve(__dirname, 'student.json'), JSON.stringify(student));


// const checkProductExists = (newDescription) => {
//     fs.readFile(path.resolve(__dirname, 'student.json'), 'utf-8', (err, data) => {
//         if (err) {
//             throw err;
//         }
    
//         // parse JSON object
//         const parseJson = JSON.parse(data.toString());
//         let condition = false;
//         for( let i = 0; i < parseJson.database.users.products.length; i++){
//             if (parseJson.database.users.products[i].product.description === newDescription){
//                 condition = true;
//                 // console.log("Product already exists")
//                 break;
//             }

//             console.log(parseJson.database.users.products[i].product.description)
//         }

//         if ( condition === false ) {
//             console.log("Product does not exist");
//         } else {
//             console.log("Product already exist");
//         }
        
//     });
// }

// checkProductExists('Echo Dot (3e génération) | Enceinte connectée Alexa avec Bluetooth | Tissu anthracite');

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

//     fs.readFile(path.resolve('Backend', 'student.json'), 'utf-8', (err, data) => {
//         if (err) {
//             throw err;
//         }
    
//         // parse JSON object
//         const parseJson = JSON.parse(data.toString());
    
//         // print JSON object
//         var product = parseJson.database.users.products.filter(product => product.prodURL === url ? true : false);
//         console.log(product[0]);
//         // console.log(product[0].prixActuel)
//         // console.log(product[0].allPrix)
//         product[0].prixActuel = prix;
//         product[0].allPrix.push(prix);
//         console.log(product);
//         const diff = product[0].prixActuel - product[0].allPrix[0];
//         const pourcentage = (diff * 100)/product[0].allPrix[0];

//         console.log(pourcentage);
//         console.log(parseJson.database.users.products);
        
    
//         // parseJson.database.users.products.push({product})
    
//         // console.log(parseJson);
    
//         fs.writeFileSync(path.resolve('Backend', 'student.json'), JSON.stringify(parseJson));

//         browser.close();
        
//     });
// }

// const updatePrice = async () => {
    
//     var data = fs.readFileSync(path.resolve('Backend', 'student.json'), 'utf-8')
    
//     // parse JSON object
//     data = JSON.parse(data.toString());
//     prod = data.database.users.products;
//     // console.log(prod.length)

//     await (async () => {
//         // console.log("test out for")
//         for (let i = 0; i < prod.length; i++){
//             // console.log("test")
//         // }
//         // await data.database.users.products.forEach(async prod => {
//             // console.log(product.prodURL);
//             const browser = await puppeteer.launch();
//             const page = await browser.newPage();
//             await page.goto(prod[i].prodURL);

//             const [el] = await page.$x('//*[@id="price_inside_buybox"]');
//             var txt;
//             var prix;

//             if(prod[i].magasin === "amazone"){
                
//                 if(el === undefined){
//                     const [el2] = await page.$x('//*[@id="newBuyBoxPrice"]');
//                     txt = await el2.getProperty('textContent');
//                     prix = (await txt.jsonValue()).trim();
//                     prix = Number(prix.replace(',', '.').replace('€', '').trim());
//                 } else {
//                     txt = await el.getProperty('textContent');
//                     prix = (await txt.jsonValue()).trim();
//                     prix = Number(prix.replace(',', '.').replace('€', '').trim());
//                 }

//             } else if (prod[i].magasin === "footlocker"){

//                 if(el === undefined){
//                     // console.log("test")
//                     const [el2] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]');
//                     txt = await el2.getProperty('textContent');
//                     prix = (await txt.jsonValue()).trim();
//                     console.log(prix)
//                     prix = Number(prix.replace(',', '.').replace('€', '').trim());
//                     if (isNaN(prix)) {
//                         const [el21] = await page.$x('//*[@id="ProductDetails"]/div[4]/div[2]/span/span/span[1]/span[2]');
//                         txt = await el21.getProperty('textContent');
//                         prix = (await txt.jsonValue()).trim();
//                         // console.log(prix)
//                         prix = Number(prix.replace(',', '.').replace('€', '').trim());
//                     }
//                     console.log(prix)
//                 } else {
//                     txt = await el.getProperty('textContent');
//                     prix = (await txt.jsonValue()).trim();
//                     // console.log(prix)
//                     prix = Number(prix.replace(',', '.').replace('€', '').trim());
//                     console.log(prix)
//                 }
//             } else {
//                 return 'mafasin non trouvable';
//             }

//             // const [el] = await page.$x('//*[@id="price_inside_buybox"]');

//             // var txt;
//             // var prix;
//             // if(el === undefined){
//             //     const [el2] = await page.$x('//*[@id="newBuyBoxPrice"]');
//             //     txt = await el2.getProperty('textContent');
//             //     prix = (await txt.jsonValue()).trim();
//             //     prix = Number(prix.replace(',', '.').replace('€', '').trim());
//             // } else {
//             //     txt = await el.getProperty('textContent');
//             //     prix = (await txt.jsonValue()).trim();
//             //     prix = Number(prix.replace(',', '.').replace('€', '').trim());
//             // }

            

//             // print JSON object
//             var product = data.database.users.products.filter(product => product.prodURL === prod[i].prodURL ? true : false);

//             // console.log(product[0]);

//             product[0].prixActuel = prix;
//             product[0].allPrix.push(prix);
//             // console.log(product);

//             const diff = product[0].prixActuel - product[0].allPrix[0];
//             const pourcentage = (diff * 100)/product[0].allPrix[0];

//             // console.log(pourcentage);
//             // console.log(data.database.users.products);
            
            

//             browser.close();
//         };
//     })()

//     console.log(prod);
    
//     fs.writeFileSync(path.resolve('Backend', 'student.json'), JSON.stringify(data));
    
//     return prod ;
        

// }

// updatePrice()

const puppeteer = require('puppeteer');
// amazone
// const [el3] = await page.$x('//*[@id="landingImage"]');// //*[@id="landingImage"]
// const src = await el3.getProperty('src');
// const image = (await src.jsonValue()).trim();

// const [el4] = await page.$x('//*[@id="productTitle"]');// //*[@id="productTitle"]
// const txtDesc = await el4.getProperty('textContent');
// const description = (await txtDesc.jsonValue()).trim();

// footlocker

//  const [el3] = await page.$x('//*[@id="main"]/div/div[2]/div/section/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div/span/img');
//  const src = await el3.getProperty('src');
//  const image = (await src.jsonValue()).trim();

//  const [el4] = await page.$x('//*[@id="pageTitle"]/span/span[1]');
//  const txtDesc = await el4.getProperty('textContent');
//  const description = (await txtDesc.jsonValue()).trim();

var XPath = [
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
    },
    {
        nom: "superdry",
        prix: [
            '//*[@id="product234289"]/div[2]/div[1]/span'
        ],
        image: [
            '//*[@id="slick-slide00"]/div/img'
        ],
        description: [
            '//*[@id="product234289"]/div[2]/h1'
            //*[@id="product234833"]
        ]
    }
    
]

function getXPaths(magasin, url){
    var data = XPath.find(mgs => {
        return mgs.nom === magasin;
    })
    console.log(data);
    if(data.nom === "superdry"){
        var r = /\d+/;
        const idProduct = url.match(r)[0];
        console.log(idProduct);
        for (let i = 0; i < data.prix.length; i++){      
            const oldIdProduct = data.prix[i].match(r)[0];
            console.log(oldIdProduct);
            data.prix[i] = data.prix[i].replace(oldIdProduct, idProduct);
            console.log(data.prix[i]); 
        }
        for (let i = 0; i < data.description.length; i++) {
            const oldIdProduct = data.description[i].match(r)[0];
            console.log(oldIdProduct);
            data.description[i] = data.description[i].replace(oldIdProduct, idProduct);
            console.log(data.description[i]);
        }
    }
    console.log(data);
    return data;
}


// getXPaths("superdry", "https://www.superdry.be/be-fr/femme/chaussures/details/180860/bottines-style-western--noir");

// getXPaths("amazone");

// async function scrapeAllProducts(url, magasin){
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     const prodURL = url;
//     const xpaths = getXPaths(magasin);
//     console.log(xpaths)
//     // var el = await page.$x(xpaths[0]);
//     // console.log(el)
//     if(xpaths){
//         for (const xpath of xpaths.prix){
//         // await xpaths.forEach(async xpath => {
//             // console.log(xpath)
//             const [el] = await page.$x(xpath);
//             // console.log(el)
        
//             if( el !== undefined) {
//                 // get price
//                 var txt = await el.getProperty('textContent');
//                 console.log(await txt.jsonValue())
//                 var prix = (await txt.jsonValue()).trim();
//                 prix = Number(prix.replace(',', '.').replace('€', '').replace(/\s+/g, '').trim());
//                 console.log(prix)
//                 // browser.close(); 

//                 break ;
//             }
//         }

//         for (const xpath of xpaths.image){

//             // get image
//             const [el3] = await page.$x(xpath);// //*[@id="landingImage"]
//             if (el3 !== undefined){
//                 const src = await el3.getProperty('src');
//                 const image = (await src.jsonValue()).trim();
//                 console.log(image);
//                 break ;
//             }
            

//         }

//         for (const xpath of xpaths.description){
//             // get description
//             const [el4] = await page.$x(xpath);// //*[@id="productTitle"]
//             if(el4 !== undefined){
//                 const txtDesc = await el4.getProperty('textContent');
//                 const description = (await txtDesc.jsonValue()).trim();
//                 console.log(description);
//                 break ;
//             }
            
//         }
//     }
//     browser.close();
    
// }

// scrapeAllProducts("https://www.amazon.fr/dp/B08VRVXHV7/ref=sspa_dk_detail_4?pd_rd_w=3KO44&pf_rd_p=c2093833-029c-4c81-8b25-2f17e8aa03bd&pd_rd_wg=piJuf&pf_rd_r=MPCBNWEHTWM47RH1QJWB&pd_rd_r=667c99fd-9ee7-4b9d-b3cc-1b9875dfbad0&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzMzAzM0VNNDFITkVIJmVuY3J5cHRlZElkPUEwOTY1NzUwMTFKRDBGWVNUQVdKSSZlbmNyeXB0ZWRBZElkPUEwNzgyNTAxMThVSjZaVTk5N1hIVCZ3aWRnZXROYW1lPXNwX2RldGFpbCZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU&th=1", "amazone")

const superDry = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const newPage = await page.goto(url);

    // console.log(newPage);

    const zalando = {
        nom: "superdry",
        prix: [
            'uqkIZw ka2E9k uMhVZi dgII7d _6yVObe _88STHx cMfkVL',
        ],
        image: [
            '/html/body/div[4]/div/div[1]/div/div/div[1]/x-wrapper-re-1-3/div/div[2]/div/div[3]/ul/li[3]/div/div/div/img'
        ],
        description: [
            '/html/body/div[4]/div/div[1]/div/div/div[2]/x-wrapper-re-1-4/div/h1/span'
        ]
    }

    // page.$x('/html/body/div[4]/div/div[1]/div/div/div[2]/x-wrapper-re-1-4/div/div[2]/div/span');
    // const [el] = await await page.$x('//html/body/div[4]/div/div[1]/div/div/div[1]/x-wrapper-re-1-3/div/div[2]/div/div[3]/ul/li[3]/div/div/div/img');
    // console.log(el);

    let texts = await page.evaluate(() => {
        var elements = document.getElementsByClassName('uqkIZw ka2E9k uMhVZi dgII7d _6yVObe _88STHx cMfkVL');// uqkIZw ka2E9k uMhVZi dgII7d _6yVObe _88STHx cMfkVL - uqkIZw ka2E9k uMhVZi FxZV-M _6yVObe pVrzNP
        console.log(elements[0])
        if(elements[0] !== undefined){
            let prix = elements[0]
            console.log("avec promo")
            // let limit = prix.indexOf('€');
            // console.log(limit);
            // prix = prix.substring(limit)
            // prix = Number(prix.replace(',', '.').replace('€', '').replace(/\s+/g, '').trim());
            return {prix, msg: "avec promo", elements};
        } else {
            elements = document.getElementsByClassName('uqkIZw ka2E9k uMhVZi FxZV-M _6yVObe pVrzNP');
            let prix = elements[0].textContent
            console.log("sans promo")

            return {prix, msg: "sans promo"}
        }
        
    });

    console.log(texts);

    let texts2 = await page.evaluate(() => {
        let elements = document.getElementsByClassName('_6yVObe u-6V88 ka2E9k uMhVZi FxZV-M _2Pvyxl JT3_zV EKabf7 mo6ZnF _1RurXL mo6ZnF _7ZONEy');
        return elements[0].src;

    });
    
    console.log(texts2)

    let texts3 = await page.evaluate(() => {
        let elements = document.getElementsByClassName('EKabf7 R_QwOV');// EKabf7 R_QwOV - EKabf7 R_QwOV
        return elements[0].textContent
    });

    console.log(texts3)

    // var txt = await el.getProperty('textContent');
    // console.log(await txt.jsonValue())
    // var prix = (await txt.jsonValue()).trim();
    // prix = Number(prix.replace(',', '.').replace('€', '').replace(/\s+/g, '').trim());
    // console.log(prix)

    // var r = /\d+/;
    // // var s = "you can enter maximum 500 choices";
    // console.log(url.match(r)[0]);
    // // var productId = url.

    browser.close();
}

superDry("https://fr.zalando.be/levis-jean-droit-bleu-le221n0h8-k11.html") // https://fr.zalando.be/levis-jean-droit-bleu-le221n0h8-k11.html - https://fr.zalando.be/adidas-performance-sweat-a-capuche-blackwhite-ad541g0hu-q11.html

// 