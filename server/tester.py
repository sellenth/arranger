from PIL import Image
from skimage import io 
from skimage.morphology import skeletonize
import matplotlib.pyplot as plt

img = io.imread('./pac.png');

skel = skeletonize(img);
plt.imshow(skel);
plt.show();
