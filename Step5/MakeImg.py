import cv2
import numpy as np
import math

def createImage(text):
  dims = (1000, 1000)
  (ydim, xdim) = dims

  B = np.ones(dims)
  G = np.ones(dims)
  R = np.ones(dims)

  img = np.dstack((B,G,R))

  img[:,:,0] = 0.5
  img[:,:,1] = 0.5
  img[:,:,2] = 1


  font_scale = 1.5
  color = (0, 0, 0)
  thickness = 2
  font = cv2.FONT_HERSHEY_SIMPLEX
  line_type = cv2.LINE_AA

  text_size, _ = cv2.getTextSize(text, font, font_scale, thickness)
  line_height = text_size[1] + 5
  text_height = text_size[1] * len(text.split("\n"))

  img[500-text_height:500+text_height,15:1000-15,:] = 1

  position = (30, 500 - math.floor(0.5 * text_height))

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

  cv2.imshow("j", img)
  cv2.waitKey(0)
  cv2.destroyAllWindows()