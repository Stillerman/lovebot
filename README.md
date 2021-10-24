# AIs deserve love too

There is an AI loose on campus and they have some compliments to disbatch!

## Step 1 - Scrape image urls from UVMMissedConnections instagram account

1. rename `creds.example.ts` to `creds.ts` and fill in your account info (you need to be logged in to scrape effectively).
2. Run the following

```bash
cd Step1
yarn install
npx parcel build index.ts -t node
node dist
```

3. You will be left with a `Step1.json` file containing the post URLs in the root directory

## Step 2 - Download images

1. Make sure you have run step 1
2. Run these commands
   
```bash
cd Step2
python download_images.py
```

## Step 3 - Extract texts from each post with OpenCV
## Step 4 - Use OpenAI to generate a missed connection for each student
## Step 5 - Use Puppeteer to follow their account, post their connection, and tag them


