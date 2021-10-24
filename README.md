# AIs deserve love too

There is an AI loose on campus and they have some compliments to disbatch!

# Step 1 - Scrape image URLS

1. rename `creds.example.ts` to `creds.ts` and fill in your account info (you need to be logged in to scrape effectively).
2. Run the following

```bash
cd Step1
yarn install
npx parcel build index.ts -t node
node dist
```

3. You will be left with a `Step1.json` file containing the post URLs in the root directory

# Step 2 - Download images

1. Make sure you have run step 1
2. Run these commands
   
```bash
cd Step2
python download_images.py
```

# Step 3 - Extract text

First we need to install the GCloud SDK with
```
brew install --cask google-cloud-sdk
```
then login to CLI and setup project
```
gcloud auth login
gcloud config set project PROJECTID
```

now run `gcloud ml vision detect-text Step2/images/1.jpg` and make sure its working. This may ask you to enable Vision API.

Convert your images to `connections.txt` with
```
cd Step3
sh ExtractTexts.sh
```

# Step 4 - Scrape UVM student data
# Step 5 - Generate connections
# Step 5 - Post connections


