import os
import openai
import sys
from MakeImg import createImage

openai.api_key = os.getenv("OPENAI_API_KEY")

def makeConnection(name):
    response = openai.Completion.create(
    engine="davinci",
    prompt=f"to the boy building the ski slope\noutside of UHS, i made kissy faces\nat you out the window and u were\nstaring. i miss u\n---\nJoe from L&L B plz kiss me hehe\n---\nOliver long has my heart. Don't\nwant to tell him\n---\nTo the boy that drives the red truck with\nIllinois plates that I keep seeing in the\nparking lot: hi you're cute & I like your\ntruck\n---\n{name}",
    temperature=1,
    max_tokens=64,
    top_p=0.51,
    frequency_penalty=0,
    presence_penalty=0,
    stop=["---"]
    )

    return name + response["choices"][0]["text"]


message = makeConnection(" ".join(sys.argv[1:]))

createImage(message)
# createImage('to the boy building the ski slope\noutside of UHS, i made kissy faces\nat you out the window and u were\nstaring. i miss u\n')

