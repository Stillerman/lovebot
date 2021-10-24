import urllib.request
# imgURL = "http://site.meishij.net/r/58/25/3568808/a3568808_142682562777944.jpg"

import json
json_file_path = "../Step1.json"

with open(json_file_path, 'r') as j:
    urls = json.loads(j.read())
    for i in range(len(urls)):
        print ("Downloading image", i, "of", len(urls))
        try:
            urllib.request.urlretrieve(urls[i], f"./images/{i}.jpg")
        except Exception as e:
            print ("Failed to get #", i, "with url", urls[i])

