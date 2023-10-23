import dlib
import tensorflow as tf
import numpy as np
import base64
from PIL import Image
import cv2
import random
def align_faces(img): #원본이미지를 넣으면 align 완료된 얼굴이미지 반환하는 함수
    detector = dlib.get_frontal_face_detector() # 얼굴 영역 인식 모델 로드

    sp = dlib.shape_predictor("res/shape_predictor_68_face_landmarks.dat")
    dets = detector(img, 1)
    objs = dlib.full_object_detections()

    for detection in dets:
        s = sp(img, detection)
        objs.append(s)

        faces = dlib.get_face_chips(img, objs, size=256, padding=0.35)

        return faces

def preprocess(img):
    return img.astype(np.float32) / 127.5 - 1 # 0~255 -> -1 ~ 1

def postprocess(img):
    return ((img+1.)*127.5).astype(np.uint8) # -1 ~ 1 -> 0~255

def makeup(img):
    tf.compat.v1.disable_eager_execution()

    with tf.compat.v1.Session() as sess: #위 코드를 통해 즉시실행했기 때문에 with 문으로 감싸줘야 한다.
        sess.run(tf.compat.v1.global_variables_initializer())

    sess = tf.compat.v1.Session()
    saver = tf.compat.v1.train.import_meta_graph("res/model.meta")
    saver.restore(sess, tf.train.latest_checkpoint("res"))
    graph = tf.compat.v1.get_default_graph()

    X = graph.get_tensor_by_name("X:0") #source
    Y = graph.get_tensor_by_name("Y:0") #reference
    Xs = graph.get_tensor_by_name("generator/xs:0") #output

    # 이거 ndarray
    # img1 = dlib.load_rgb_image("BeautyGAN/imgs/05.jpg")
    img1_faces = align_faces(img) # 여기서 바로 ndarray 넣어주면 될듯
    # print(type(img1_faces))
    #메이크업 이건 이미 있는 경로에서 불러오면 됨.
    img2 = dlib.load_rgb_image("res/makeup/vFG756.png")
    print(type(img2))
    img2_faces = align_faces(img2)

    src_img = img1_faces[0] # 소스 이미지
    ref_img = img2_faces[0] # 레퍼런스 이미지

    X_img = preprocess(src_img)
    X_img = np.expand_dims(X_img, axis=0)
    #np.expand_dims(): 배열에 차원을 추가한다. 즉, (256,256,2) -> (1,256,256,3)

    Y_img = preprocess(ref_img)
    Y_img = np.expand_dims(Y_img, axis=0) #텐서플로에서 0번 axis는 배치 방향

    output = sess.run(Xs, feed_dict={
        X:X_img,
        Y:Y_img
    })

    output_img = postprocess(output[0])

    #image_path = "/content/drive/MyDrive/BeautyGAN/imgs/no_makeup/xfsy_0055.png"  # 이미지 파일의 경로를 해당 경로로 바꿔주세요

    '''
    # 이미지 파일을 바이너리 모드로 읽어들임
    with open(image_path, "rb") as image_file:
        # 이미지를 base64로 인코딩
        base64_image = base64.b64encode(image_file.read()).decode("utf-8")

    print(base64_image)
    '''
    # 넘파이 배열을 이미지 파일로 저장
    random_int = random.randint(1,1000);
    image_path = f"output/output_image_{random_int}.png" 
    Image.fromarray(output_img).save(image_path)

    # 이미지 파일을 바이너리 모드로 읽어들임
    with open(image_path, "rb") as image_file:
        # 이미지를 base64로 인코딩
        base64_image = base64.b64encode(image_file.read()).decode("utf-8")
        # 디코딩된 base64언어 return 해주기.
    # print(base64_image)
    return base64_image
