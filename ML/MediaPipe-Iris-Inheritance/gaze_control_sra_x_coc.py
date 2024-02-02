import cv2
import itertools
import numpy as np
from time import time
import mediapipe as mp
import matplotlib.pyplot as plt


# https://pixspy.com/

# mp_drawing = mp.solutions.drawing_utils


# mp_drawing_styles = mp.solutions.drawing_styles

mp_face_mesh = mp.solutions.face_mesh
face_mesh_images = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=2,
                                         min_detection_confidence=0.5)
sample_img = cv2.imread('/home/labhansh/Inheritance/python_part/yath_test.jpg')

# /home/labhansh/Inheritance/python_part/yath_test.jpg
sample_img = cv2.cvtColor(sample_img, cv2.COLOR_BGR2GRAY)
sample_img= cv2.GaussianBlur(sample_img,(5,5),2.0)
# _, sample_img=cv2.threshold(sample_img,np.average(sample_img),255,cv2.THRESH_BINARY)
# cv2.resize(sample_img, (500,1500))

# sample_img2= cv2.imread('/home/labhansh/Inheritance/python_part/pix3d.png')
image_rgb = cv2.cvtColor(sample_img, cv2.COLOR_BGR2RGB)
height,width,_=image_rgb.shape
# image_rgb = image_rgb[140:190, 220:370]   
print(image_rgb.shape)
# plt.figure(figsize = [10, 10])
result = face_mesh_images.process(image_rgb[:,:,::-1])


# print(result)

index_l=[246,33,160,159,157,158,173,154,153,145,144,163,7]
index_r=[398,249,373,374,380,381,384,385,386,387,388,390,466]


for facial_landmarks in result.multi_face_landmarks:
    for i in range (0,468):
        if i in index_l or i in index_r:
            pt1=facial_landmarks.landmark[i]
            # print(index)
            x =int(pt1.x*width)
            y=int(pt1.y*height)
            print(" ", x," ",y)
            cv2.circle(image_rgb,(x,y),0,(0, 000,00))
pts_l=[[int(facial_landmarks.landmark[i].x*width),int(facial_landmarks.landmark[i].y*height)] for i in index_l]
pts_r=[[int(facial_landmarks.landmark[i].x*width),int(facial_landmarks.landmark[i].y*height)] for i in index_r]
pts=pts_l+pts_r
pts=np.array(pts)

# print("POINTS LEFT",pts_l)
# print("POINTS RIGHT",pts_r)
pts_l=np.array(pts_l)
pts_r=np.array(pts_r)

# left eye**************************************

# for i in index_l:

print(type(index_l[0]))
min_x_l=np.min(pts_l[:,:1])
min_y_l=np.min(pts_l[:,1:])
max_x_l=np.max(pts_l[:,:1])
max_y_l=np.max(pts_l[:,1:])

for i in index_l:
    if int(facial_landmarks.landmark[i].x*width)==max_x_l:
        print(i)

# 33 min x l
# 173 max x l

y_btwn = int((min_y_l+max_y_l)/2)
x_btwn = int((min_x_l+max_x_l)/2)
 
left_eye_mask_leftbound=image_rgb[min_y_l:max_y_l,min_x_l:x_btwn]
left_eye_mask_rightbound=image_rgb[min_y_l:max_y_l,x_btwn:max_x_l]

left_eye_mask=image_rgb[min_y_l:max_y_l,min_x_l:max_x_l]

win_name="check "
cv2.namedWindow(win_name, cv2.WINDOW_NORMAL)
_,left_eye_threshold=cv2.threshold(left_eye_mask,60,255,cv2.THRESH_BINARY)

# threshold_imp = left_eye_mask
_,left_eye_leftbound_threshold=cv2.threshold(left_eye_mask_leftbound,np.average(left_eye_mask),255,cv2.THRESH_BINARY)
_,left_eye_rightbound_threshold=cv2.threshold(left_eye_mask_rightbound,np.average(left_eye_mask),255,cv2.THRESH_BINARY)

cv2.imshow(win_name, image_rgb)
cv2.imshow("mask",left_eye_mask)
cv2.imshow("threshold",left_eye_threshold)
# cv2.imshow("leftbound",left_eye_leftbound_threshold)
# cv2.imshow("rightbound",left_eye_rightbound_threshold)


leye_left_count=(np.count_nonzero(left_eye_leftbound_threshold,axis=None,keepdims=False))
leye_right_count=(np.count_nonzero(left_eye_rightbound_threshold,axis=None,keepdims=False))

#closed
if(leye_left_count<50 and leye_right_count<50):
    print("Aaakh kholiye gana nahi sunna kya BRUTEFORCE")
#open and centre
elif(abs(leye_left_count-leye_right_count)<100):
    print("open and centre BRUTEFORCE")
#right
elif(leye_left_count>leye_right_count):
    print("daaeyien (right) BRUTEFORCE")
#left
elif(leye_left_count<leye_right_count):
    print("baaeyien (left) BRUTEFORCE")

poly_mask=np.zeros(image_rgb.shape,np.uint8)
poly_mask=cv2.polylines(poly_mask,[pts_l],True,255,2)
poly_mask=cv2.fillPoly(poly_mask,[pts_l],255)
white_eye=poly_mask

poly_mask = (poly_mask).astype(np.uint8)
poly_mask=poly_mask[:,:,:1]
masked_eye=cv2.bitwise_and(image_rgb, image_rgb, mask=poly_mask)
sum=0
count=0
white_eye=white_eye[:,:,:1]
masked_eye=masked_eye[:,:,:1]

for i in range (0,image_rgb.shape[0]):
    for j in range (0,image_rgb.shape[1]):
        if(white_eye[i][j]==255):
            sum=sum+int(masked_eye[i][j])
            count=count+1

print(sum)
avg=int(sum/count)
print(avg)
print(np.average(left_eye_mask))
_,masked_eye=cv2.threshold(masked_eye,avg,255,cv2.THRESH_BINARY)

# masked_eye=cv2.bitwise_and(masked_eye,masked_eye, mask=poly_mask)


cv2.imwrite('/home/labhansh/Inheritance/python_part/tingu.png',masked_eye)
# cv2.imwrite('/home/labhansh/Inheritance/python_part/mask.png',dst2)
cv2.imshow("finalotupt",masked_eye)

pts_l=np.array(pts_l)
pts_r=np.array(pts_r)

min_x=np.min(pts_l[:,:1])
min_y=np.min(pts_l[:,1:])
max_x=np.max(pts_l[:,:1])
max_y=np.max(pts_l[:,1:])

y_btwn = int((min_y+max_y)/2)
x_btwn = int((min_x+max_x)/2)
 
left_eye_mask_leftbound=masked_eye[min_y:max_y,min_x:x_btwn]
left_eye_mask_rightbound=masked_eye[min_y:max_y,x_btwn:max_x]

# cv2.imshow("leftbound",left_eye_mask_leftbound)
# cv2.imshow("rightbound",left_eye_mask_rightbound)

# left_eye_mask_leftbound=cv2.threshold
leye_left_count=(np.count_nonzero(left_eye_mask_leftbound,axis=None,keepdims=False))
leye_right_count=(np.count_nonzero(left_eye_mask_rightbound,axis=None,keepdims=False))

#closed
if(leye_left_count<5 and leye_right_count<5):
    print("Aaakh kholiye gana nahi sunna kya POLYGON")
#open and centre
elif(abs(leye_left_count-leye_right_count)<200):
    print("open and centre POLYGON")
#right
elif(leye_left_count>leye_right_count):
    print("daaeyien (right) POLYGON")
#left
elif(leye_left_count<leye_right_count):
    print("baaeyien (left) POLYGON")


cv2.imshow("left_eye_mask_leftbound",left_eye_mask_leftbound)
cv2.imshow("left_eye_mask_rightbound",left_eye_mask_rightbound)

cv2.resizeWindow(win_name, width*2, height*3)
cv2.waitKey(0)
cv2.destroyAllWindows()


#**********right eye**************

min_x_r=np.min(pts_r[:,:1])
min_y_r=np.min(pts_r[:,1:])
max_x_r=np.max(pts_r[:,:1])
max_y_r=np.max(pts_r[:,1:])


y_btwn = int((min_y_r+max_y_r)/2)
x_btwn = int((min_x_r+max_x_r)/2)
 
right_eye_mask_leftbound=image_rgb[ min_y_r:max_y_r,min_x_r:x_btwn]
right_eye_mask_rightbound=image_rgb[min_y_r:max_y_r,x_btwn:max_x_r]
right_eye_mask=image_rgb[min_y_r:max_y_r,min_x_r:max_x_r]

_,right_eye_threshold=cv2.threshold(right_eye_mask,60,255,cv2.THRESH_BINARY)

# threshold_imp = right_eye_mask
_,right_eye_leftbound_threshold=cv2.threshold(right_eye_mask_leftbound,np.average(right_eye_mask),255,cv2.THRESH_BINARY)
_,right_eye_rightbound_threshold=cv2.threshold(right_eye_mask_rightbound,np.average(right_eye_mask),255,cv2.THRESH_BINARY)

cv2.imshow(win_name, image_rgb)
cv2.imshow("mask",right_eye_mask)
cv2.imshow("threshold",right_eye_threshold)
# cv2.imshow("leftbound",right_eye_leftbound_threshold)
# cv2.imshow("rightbound",right_eye_rightbound_threshold)


reye_left_count=(np.count_nonzero(right_eye_leftbound_threshold,axis=None,keepdims=False))
reye_right_count=(np.count_nonzero(right_eye_rightbound_threshold,axis=None,keepdims=False))


#closed
if(reye_left_count<50 and reye_right_count<50):
    print("Aaakh kholiye gana nahi sunna kya BRUTEFORCE")
#open and centre
elif(abs(reye_left_count-reye_right_count)<100):
    print("open and centre BRUTEFORCE")
#right
elif(reye_left_count>reye_right_count):
    print("daaeyien (right) BRUTEFORCE")
#left
elif(reye_left_count<reye_right_count):
    print("baaeyien (left) BRUTEFORCE")

poly_mask=np.zeros(image_rgb.shape,np.uint8)
poly_mask=cv2.polylines(poly_mask,[pts_r],True,255,2)
poly_mask=cv2.fillPoly(poly_mask,[pts_r],255)
white_eye=poly_mask

poly_mask = (poly_mask).astype(np.uint8)
poly_mask=poly_mask[:,:,:1]
masked_eye=cv2.bitwise_and(image_rgb, image_rgb, mask=poly_mask)
sum=0
count=0
white_eye=white_eye[:,:,:1]
masked_eye=masked_eye[:,:,:1]

for i in range (0,image_rgb.shape[0]):
    for j in range (0,image_rgb.shape[1]):
        if(white_eye[i][j]==255):
            sum=sum+int(masked_eye[i][j])
            count=count+1

print(sum)
avg=int(sum/count)
print(avg)
print(np.average(right_eye_mask))
_,masked_eye=cv2.threshold(masked_eye,avg,255,cv2.THRESH_BINARY)

# masked_eye=cv2.bitwise_and(masked_eye,masked_eye, mask=poly_mask)


cv2.imwrite('/home/labhansh/Inheritance/python_part/tingu.png',masked_eye)
# cv2.imwrite('/home/labhansh/Inheritance/python_part/mask.png',dst2)
cv2.imshow("finalotupt",masked_eye)

pts_r=np.array(pts_r)
pts_r=np.array(pts_r)

min_x=np.min(pts_r[:,:1])
min_y=np.min(pts_r[:,1:])
max_x=np.max(pts_r[:,:1])
max_y=np.max(pts_r[:,1:])

y_btwn = int((min_y+max_y)/2)
x_btwn = int((min_x+max_x)/2)
 
right_eye_mask_leftbound=masked_eye[min_y:max_y,min_x:x_btwn]
right_eye_mask_rightbound=masked_eye[min_y:max_y,x_btwn:max_x]

# cv2.imshow("leftbound",right_eye_mask_leftbound)
# cv2.imshow("rightbound",right_eye_mask_rightbound)

# right_eye_mask_leftbound=cv2.threshold
reye_left_count=(np.count_nonzero(right_eye_mask_leftbound,axis=None,keepdims=False))
reye_right_count=(np.count_nonzero(right_eye_mask_rightbound,axis=None,keepdims=False))

#closed
if(reye_left_count<5 and reye_right_count<5):
    print("Aaakh kholiye gana nahi sunna kya POLYGON")
#open and centre
elif(abs(reye_left_count-reye_right_count)<200):
    print("open and centre POLYGON")
#right
elif(reye_left_count>reye_right_count):
    print("daaeyien (right) POLYGON")
#left
elif(reye_left_count<reye_right_count):
    print("baaeyien (left) POLYGON")


cv2.imshow("right_eye_mask_leftbound",right_eye_mask_leftbound)
cv2.imshow("right_eye_mask_rightbound",right_eye_mask_rightbound)

cv2.resizeWindow(win_name, width*2, height*3)
cv2.waitKey(0)
cv2.destroyAllWindows()










# ok0=cv2.contourArea(np.array(pts_l).astype(np.float32))
# ok1=cv2.contourArea(np.array(pts_r).astype(np.float32))
# print("COMPARING AREA", ok0, ok1)

# isClosed = False
# color = (0, 255, 0)
# thickness = 8

# image = cv2.polylines(image_rgb, [pts], 
#                       isClosed, color, 
#                       thickness)     
    # for i in range (25,30):
    #     pt1=facial_landmarks.landmark[i]
    #     x =int(pt1.x*width)
    #     y=int(pt1.y*height)
    #     cv2.circle(image_rgb,(x,y),2,(0, 100,100))
    
#***************************
# pts = np.array([[10,150],[150,100],[300,150],[350,100],[310,20],[35,10]])

##LEFT EYE
## (1) Crop the bounding rect
# rect = cv2.boundingRect(pts_l)
# x,y,w,h = rect
# croped = image_rgb[y:y+h, x:x+w].copy()

# ## (2) make mask
# pts = pts - pts.min(axis=0)

# mask = np.zeros(croped.shape[:2], np.uint8)
# cv2.drawContours(mask, [pts], -1, (255, 255, 255), -1, cv2.LINE_AA)

# ## (3) do bit-op
# dst = cv2.bitwise_and(croped, croped, mask=mask)

# ## (4) add the white background
# bg = np.ones_like(croped, np.uint8)*255
# cv2.bitwise_not(bg,bg, mask=mask)
# dst2 = bg+ dst

# ## RIGHT EYE
# rect = cv2.boundingRect(pts_l)
# x,y,w,h = rect
# croped = image_rgb[y:y+h, x:x+w].copy()

# ## (2) make mask
# pts = pts - pts.min(axis=0)

# mask = np.zeros(croped.shape[:2], np.uint8)
# cv2.drawContours(mask, [pts], -1, (255, 255, 255), -1, cv2.LINE_AA)

# ## (3) do bit-op
# dst = cv2.bitwise_and(croped, croped, mask=mask)

# ## (4) add the white background
# bg = np.ones_like(croped, np.uint8)*255
# cv2.bitwise_not(bg,bg, mask=mask)
# dst2 = bg+ dst