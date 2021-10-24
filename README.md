# AIs deserve love too

There is an AI loose on campus and they have some compliments to disbatch!

## How it works

1. Scrape image urls from UVMMissedConnections instagram account
2. Download images
3. Extract texts from each post with OpenCV
4. Scrape list of UVM student's names from their instagram
5. Use OpenAI to generate a missed connection for each student
6. Use Puppeteer to follow their account, post their connection, and tag them

### Step 1

To replicate

1. rename `creds.example.ts` to `creds.ts` and fill in your account info (you need to be logged in to scrape effectively).
2. Run the following

```bash
cd Step1
yarn install
npx parcel build index.ts -t node
node dist
```

3. You will be left with a `Step1.json` file containing the post URLs in the root directory

