import os
import openai
import sys
from MakeImg import createImage

openai.api_key = os.getenv("OPENAI_API_KEY")

def makeConnection(name):
    # response = openai.Completion.create(
    # engine="davinci",
    # prompt=f"to the boy building the ski slope\noutside of UHS, i made kissy faces\nat you out the window and u were\nstaring. i miss u\n---\nJoe from L&L B plz kiss me hehe\n---\nOliver long has my heart. Don't\nwant to tell him\n---\nTo the boy that drives the red truck with\nIllinois plates that I keep seeing in the\nparking lot: hi you're cute & I like your\ntruck\n---\n{name}",
    # temperature=1,
    # max_tokens=64,
    # top_p=0.51,
    # frequency_penalty=0,
    # presence_penalty=0,
    # stop=["---"]
    # )

    response = openai.Completion.create(
        engine="davinci",
        prompt="to the guy with iowa plates we saw driving\n(3/14) sorry for tailgating we just really\nwanted to know what spotify song you had\nas a sticker\n---\nJoe from L&L B plz kiss me hehe\n---\nOliver long has my heart. Don't\nwant to tell him\n---\nMorgan you have such a\nwonderful energy and I just wanna\ngo look at moths with you\n---\nBlondie I keep seeing in RowellA\nshe could 100% pull me\n---\n",
        temperature=0.8,
        max_tokens=64,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=["---"]
    )

    return name + response["choices"][0]["text"]


message = makeConnection(" ".join(sys.argv[1:]) + " ")

createImage(message)
# createImage('to the boy building the ski slope\noutside of UHS, i made kissy faces\nat you out the window and u were\nstaring. i miss u\n')

