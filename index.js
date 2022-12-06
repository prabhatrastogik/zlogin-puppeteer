/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
 import puppeteer from 'puppeteer';
 import totp from 'totp-generator';
 
 function getCreds(){
     return {
       'apikey': process.env.apikey,
       'userid': process.env.userid,
       'password': process.env.password,
       'totpkey': process.env.totpkey,
       'apiauth': process.env.apiauth,
     }
 }
 
 export const run = async (event, context) => {
     const {
         apikey, 
         userid, 
         password, 
         totpkey, 
         apiauth,
     } = getCreds()
     const browser = await puppeteer.launch({ headless: true });
     const page = await browser.newPage();
 
     await page.setViewport({ width: 1280, height: 800 });
     const redirect_params = encodeURIComponent(`api_auth=${apiauth}`)
     await page.goto(`https://kite.trade/connect/login?api_key=${apikey}&v=3&redirect_params=${redirect_params}`);
     const navigationPromise = page.waitForNavigation();
     await page.waitForSelector('input[type="text"]', { timeout: 5000 });
     await page.type('input[type="text"]', userid);
 
     await page.waitForSelector('input[type="password"]', { timeout: 5000 });
     await page.type('input[type="password"]', password);
 
     await page.click('button[type="submit"]');
 
     await new Promise(resolve => setTimeout(resolve, 3000))
 
     await page.waitForSelector('form input', { timeout: 5000 });
     await page.type('form input', totp(totpkey));
 
     await page.click('button[type="submit"]');
 
     await navigationPromise;
     console.log(page.url());
     await browser.close();
 }
 