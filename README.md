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

1. rename `creds.example.ts` to `creds.ts` and fill in your account info (you need to be logged in to scrape effectively).
2. Run the following

```bash
cd Step4
yarn install
npx parcel build index.ts -t node
node dist
```

1. You will be left with a `acc_handles.json` file containing scraped instagram handles in the `Step4` directory.
   
# Step 5 - OpenAI's GPT 3 - Generate connections

OpenAI does not allow for their models to be used on social media unfortunately, so we will need to recreate this using a different technique. 


# Step 5 - Fine-tuning GPT-2 - Generate connections

Upload `FineTuneLoveBot.ipynb` to Google Colab and follow the steps in there. When it has finished running, copy `models` and `checkpoint` folders from Google Drive into `Step5-EasyGPT` folder. Install `OpenCV`, `gpt_2_simple`, and `starlette` with a python package manager of your choice.

Run `python server.py` and wait until it starts listening. You will now me able to generate connections by sending GET requests to `http://localhost:8080/?prefix=NAME_GOES_HERE`. Note: these will take ~30 seconds to generate.

# Step 6 - Post connections

With Step 5's server still running and Step 4's `acc-handles.json` generated, and `creds.example.ts` configured like we had done above, run

```
yarn
yarn build
node dist
```

and watch LoveBot get to work.

