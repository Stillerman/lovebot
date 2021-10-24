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

async function scrapeFollowers(username: string, browser: ppt.Browser) : Promise<string[]> {
    const page = await browser.newPage()

    await page.goto(`https://www.instagram.com/${username}/`)

    let followers = []

    await page.click("a")

    await delay(1000)

    for (var i = 0; i < 100; i++) {
        await page.evaluate(() => {
          document.querySelector(".isgrP").scrollBy(0, window.innerHeight)
        });
        await delay(500)
        const tmpFollowers = await page.evaluate(() => {
          return  Array.from(document.querySelectorAll("span>a")).map(a => a['href'].split("/")[3])
        })

        followers = [...followers, ...tmpFollowers]
    }
    return followers;

}

async function run() {
    const browser = await ppt.launch({
        headless: false
    })

    await login(username, password, browser)
    const followers = await scrapeFollowers("uvmmissedconnections", browser)
    const uniqueFollowers = Array.from(new Set(followers))


    fs.writeFileSync("./acc_handles.json", JSON.stringify(uniqueFollowers))    
}

run()

function delay(ms: number) {
    return new Promise((acc, rej) => {
        setInterval(() => {
            acc(0)
        }, ms)
    })
}