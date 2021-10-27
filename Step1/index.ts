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
  await wait(5000);

  return;
}

type ScrapePostsArgs = {
  username: string,
  imgCount: number,
  scrolls: number,
  delay: number,
  browser: ppt.Browser
}

async function scrapePosts({ username, imgCount, scrolls, delay, browser }: ScrapePostsArgs): Promise<string[]> {
  const page = await browser.newPage()

  await page.goto(`https://www.instagram.com/${username}/`)

  let imgs = []

  while (imgs.length < imgCount) {
    await page.evaluate((scrolls) => {
      for (var i = 0; i < scrolls; i++) {
        window.scrollBy(0, window.innerHeight);
      }
    }, scrolls);
    await wait(delay)
    const tmpImgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("img")).map(img => img.src)
    })

    imgs = Array.from(new Set([...imgs, ...tmpImgs]))
    console.log("Scraped", imgs.length, "so I'm", Math.floor(100 * imgs.length / imgCount), "% done")
  }

  return imgs;

}

async function run() {
  const browser = await ppt.launch({
    headless: false
  })

  console.log("Logging in")
  await login(username, password, browser)
  console.log("Scraping posts")
  const imgs = await scrapePosts({
    username: "uvmmissedconnections",
    imgCount: 4700,
    scrolls: 3,
    delay: 3000,
    browser
  })

  fs.writeFileSync("../Step1.json", JSON.stringify(imgs))
}

run()

function wait(ms: number) {
  return new Promise((acc, rej) => {
    setInterval(() => {
      acc(0)
    }, ms)
  })
}