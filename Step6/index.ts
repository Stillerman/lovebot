import ppt from 'puppeteer'
import fs from 'fs'
import { password, username } from './creds';

async function login(
    username: string,
    password: string,
    browser: ppt.Browser
  ) {
    const page = await browser.newPage();
  
    await page.goto("https://www.instagram.com/accounts/login/");
    await page.waitForSelector("input[name=username]");
  
    await page.type("input[name=username]", username, {
      delay: 20,
    });
  
    await page.type("input[name=password]", password, {
      delay: 20,
    });
  
    await page.click("button[type=submit]");
    await delay(3000);
  
    return;
  }

async function doThing(username: string, browser: ppt.Browser) {
    const page = await browser.newPage()

    await page.goto(`https://www.instagram.com/${username}/`)

    const name = await page.evaluate(() => {
      return document.querySelector("h1").textContent
    })

    console.log("HIS NAME", name);
    

    // Follow Them
    await page.click("button")

    // Click Creatre new post
    await page.click("svg[aria-label='New Post']")
   
}

async function run() {
    const browser = await ppt.launch({
        headless: false
    })

    await login(username, password, browser)
    await doThing("sjdingwall", browser)

}

run()

function delay(ms: number) {
    return new Promise((acc, rej) => {
        setInterval(() => {
            acc(0)
        }, ms)
    })
}