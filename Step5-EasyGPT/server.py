import io
import os
import gc
import cv2
from random import uniform
from starlette.applications import Starlette
from starlette.responses import JSONResponse, StreamingResponse
import gpt_2_simple as gpt2
import tensorflow as tf
import uvicorn
from MakeImg import createImage

app = Starlette(debug=False)

# Start and load session
sess = gpt2.start_tf_sess(threads=1)
gpt2.load_gpt2(sess)

# Needed to avoid cross-domain issues
response_header = {
    'Access-Control-Allow-Origin': '*'
}


def makeConnection(name):
    texts = gpt2.generate(sess,
                          length=100,
                          temperature=uniform(0.7, 1.0),
                          top_k=40,
                          nsamples=5,
                          prefix=name,
                          truncate="---",
                          include_prefix=True,
                          return_as_list=True
                          )
    return [" ".join(text.split("\n")) for text in texts]


@app.route('/', methods=['GET'])
async def homepage(request):
    global sess

    params = request.query_params

    texts = makeConnection(params.get("prefix"))
    text = max(texts, key=len)

    gc.collect()

    img = createImage(text, returnImg=True)

    res, im_png = cv2.imencode(".png", img)
    return StreamingResponse(io.BytesIO(im_png.tobytes()), media_type="image/png")

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
