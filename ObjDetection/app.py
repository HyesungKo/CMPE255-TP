#!/usr/bin/env python
# encoding: utf-8
import json
import os
from flask import Flask, render_template, request, flash, jsonify
from flask_uploads import UploadSet, configure_uploads, IMAGES
from flask_cors import CORS
from werkzeug.datastructures import FileStorage 
from files.images.code import get_image_predict
from PIL import Image

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'hardsecretkey'
photos = UploadSet('photos', IMAGES)
app.config['UPLOADED_PHOTOS_DEST'] = 'files/images'
configure_uploads(app, photos)

@app.route('/imageadd', methods=['POST'])
def update_record():
    if not request.files:
        return jsonify({'msg': "all Okay"}), 203
    filename = photos.save(request.files['profileImage'])
    print(filename)
    image, parameter = get_image_predict("files/images/"+filename)
    image = Image.fromarray(image)
    image.save("files/results/"+ filename)
    with open("files/results/"+filename) as f:
        upload = FileStorage(f, filename, name='file', content_type='image/jpeg')
    url = photos.url(upload)
    return jsonify({'msg': "all Okay", 'text': parameter, 'url':url }), 200
    

app.run()