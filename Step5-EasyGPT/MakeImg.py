import cv2
import numpy as np
import math
import random

def createImage(text, returnImg = False):
  lines = []
  current_line = ""
  max_chars = 35

  for word in text.split(" "):
    if (len(word) + len(current_line) < max_chars):
      current_line += word + " "
    else:
      lines.append(current_line)
      current_line = word + " "
  lines.append(current_line)

  text = "\n".join(lines)

  dims = (1000, 1000)
  (ydim, xdim) = dims

  B = np.ones(dims)
  G = np.ones(dims)
  R = np.ones(dims)

  img = np.dstack((B,G,R))

  img[:,:,0] = random.uniform(0, 1)
  img[:,:,1] = random.uniform(0, 1)
  img[:,:,2] = random.uniform(0, 1)


  font_scale = 1.5
  color = (0, 0, 0)
  thickness = 2
  font = cv2.FONT_HERSHEY_SIMPLEX
  line_type = cv2.LINE_AA

  text_size, _ = cv2.getTextSize(text, font, font_scale, thickness)
  line_height = text_size[1] + 10
  text_height = line_height * (len(text.split("\n")) + 1)
  half_text_height = math.floor(text_height / 2)

  img[500-half_text_height:500+half_text_height,15:1000-15,:] = 1

  position = (30, 500 - half_text_height + line_height)

  x, y0 = position
  for i, line in enumerate(text.split("\n")):
      y = y0 + i * line_height
      img = cv2.putText(img,
                  line,
                  (x, y),
                  font,
                  font_scale,
                  color,
                  thickness,
                  line_type)

  if (returnImg):
    return img*255.0

  cv2.imwrite("tada.png", img * 255.0)