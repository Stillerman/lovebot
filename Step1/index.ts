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

async function scrapePosts(username: string, browser: ppt.Browser) : Promise<string[]> {
    const page = await browser.newPage()

    await page.goto(`https://www.instagram.com/${username}/`)

    let imgs = []

    for (var i = 0; i < 1000; i++) {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
        await delay(500)
        const tmpImgs = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("img")).map(img => img.src)  
        })

        imgs = [...imgs, ...tmpImgs]
    }

    return imgs;

}

async function run() {
    const browser = await ppt.launch({
        headless: false
    })

    await login(username, password, browser)
    const imgs = await scrapePosts("uvmmissedconnections", browser)
    const uniqueImgs = Array.from(new Set(imgs))


    fs.writeFileSync("../Step1.json", JSON.stringify(uniqueImgs))    
}

run()

function delay(ms: number) {
    return new Promise((acc, rej) => {
        setInterval(() => {
            acc(0)
        }, ms)
    })
}