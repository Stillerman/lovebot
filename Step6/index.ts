import ppt from "puppeteer";
import fs from "fs";
import axios from "axios";
import { password, username } from "./creds";
import handles from "../Step4/acc_handles.json";

async function login(username: string, password: string, browser: ppt.Browser) {
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

async function downloadImage(url: string) {
  const path = "temp.png";
  const writer = fs.createWriteStream(path);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function doThing(username: string, browser: ppt.Browser) {
  const page = await browser.newPage();

  await page.goto(`https://www.instagram.com/${username}/`);

  const name = await page.evaluate(() => {
    return document.querySelector("h1").textContent;
  });

  const imagePromise = downloadImage(encodeURI("http://localhost:8080/?prefix=" + name));

  await clickButtonWithText(page, "Follow");
  await delay(500);

  await delay(3000);

  // Click Creatre new post
  await page.click("svg[aria-label='New Post']");

  await page.waitForXPath("//button[contains(text(),'Select from computer')]");
  let next = await page.$x("//button[contains(text(),'Select from computer')]");

  await imagePromise
  const image = "./temp.png";

  let [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    next[0].click(),
  ]);
  await fileChooser.accept([image]);
  await delay(500);

  await clickButtonWithText(page, "Next");
  await delay(500);
  await clickButtonWithText(page, "Next");
  await delay(1000);

  await page.type("textarea", `@${username}`);

  await clickButtonWithText(page, "Share");

  await delay(15000);
  await page.close();
}

async function run() {
  const browser = await ppt.launch({
    headless: false,
  });

  await login(username, password, browser);

  for (let i = 0; i < 20; i++) {
    console.log("HERE WE GO", handles[i], i);
      try {
        await doThing(handles[i], browser);
      } catch (e) {
        console.log("Failed", i);
        
      }
      await delay(1000 * 60 * (1 + Math.random() * 4))
  }

  await browser.close()
}

run();

function delay(ms: number) {
  return new Promise((acc, rej) => {
    setInterval(() => {
      acc(0);
    }, ms);
  });
}

async function clickButtonWithText(page, text) {
  try {
  await page.waitForXPath(`//button[contains(text(),'${text}')]`);
  let next = await page.$x(`//button[contains(text(),'${text}')]`);
  await next[0].click();
  } catch (e) {
    console.log("Couldn't find", text);
  }
}
