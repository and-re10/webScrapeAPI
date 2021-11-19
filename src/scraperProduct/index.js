const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="price_inside_buybox"]');
    const txt = await el.getProperty('textContent');
    const prix = (await txt.jsonValue()).trim();
    // .replace(/\n/g, '') == ok
    // .trim(); == ok
    // 'innerText' == ok

    console.log({ prix });

    browser.close();
}

// scrapeProduct('https://www.amazon.fr/echo-dot-3eme-generation-enceinte-connectee-avec-alexa-tissu-anthracite/dp/B07PHPXHQS/?_encoding=UTF8&pd_rd_w=q2xUl&pf_rd_p=672e9261-e57b-4ca7-a739-011bdc804371&pf_rd_r=QZY5M9736NQ9ETRS0HV0&pd_rd_r=847d27ef-42f5-49c6-8ced-0af6cbdb9506&pd_rd_wg=Fo5rT&ref_=pd_gw_unk')

export default scrapeProduct ;