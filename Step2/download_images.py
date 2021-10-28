import urllib.request
import json

json_file_path = "../Step1.json"

with open(json_file_path, 'r') as j:
    urls = json.loads(j.read())
    for i in range(len(urls)):
        print ("Downloading image", i, "of", len(urls))
        try:
            urllib.request.urlretrieve(urls[i], f"./images/{i}.jpg")
        except Exception as e:
            print ("Failed to get #", i,e)
