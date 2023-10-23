from flask import Flask, request, jsonify
from flask_cors import CORS
# import subprocess
# import requests
import cv2
import numpy as np
import personal_color_analysis.personal_color as personal_color
from beautygan_makeup.beautygan import makeup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/')
def index():
    return '<h2>Welcome</h2>Hello, Web'

@app.route('/analyze', methods=['POST'])
def analyze_image():
    try:
        image_file = request.files.get('file')
        if not image_file:
            return jsonify({'error': 'No file part'}), 400

        # 이미지 파일을 numpy 배열로 변환
        image_data = np.frombuffer(image_file.read(), np.uint8)
        image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        
        # Personal Color Analysis 수행
        tone = personal_color.analysis(image)
        # tone = '봄'

        return jsonify({'result': tone}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/makeup', methods=['POST'])
def handle_makeup_request():
    try:
        image_file = request.files.get('file')
        if not image_file:
            return jsonify({'error': 'No file part'}, 400)

        image_data = np.frombuffer(image_file.read(), np.uint8)
        image_bgr = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

        # beautygan.py의 makeup 함수를 호출하여 결과를 받아옵니다.
        base64_image = makeup(image)

        # 처리 결과를 클라이언트에게 반환합니다.
        return jsonify({'base64_image': base64_image}), 200


    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
