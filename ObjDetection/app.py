#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask, render_template, request, flash, jsonify
from flask_uploads import UploadSet, configure_uploads, IMAGES
from flask_cors import CORS
# from code import get_image_predict


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
    url = photos.url(filename)
    print(filename)
    return jsonify({'msg': "all Okay", "filename": filename}), 200
    

app.run(debug=True)