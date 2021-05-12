/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable constructor-super */
import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import  TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Container from 'react-bootstrap/Container';
import { Form, Carousel } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

// eslint-disable-next-line arrow-body-style

const ObjectDetection = () => {
  const [imageList, addImage] = useState([]);
  const [imgCounter, addCounter] = useState(0);
  const [showImage, addShowImage] = useState([]);
  const [resp, changeResp] = useState(false);
  const [responseText, changeText] = useState('');

  const ImageTake = async (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    addShowImage([url]);
    addCounter(imgCounter + 1);
    addImage([
      ...imageList,
      {
        id: `image${imgCounter}`,
        file: event.target.files[0],
        file_name: event.target.files[0].name,
      },
    ]);
  };
  const submit = async () => {
    if (imageList.length > 0){
      const formData = new FormData();
      formData.append('profileImage',imageList[0].file,imageList[0].file_name);
      const config = {
        headers: { 
          'content-type': 'multipart/form-data'
        }
      }
      const response = await axios.post('http://localhost:5000/imageadd',formData,config)
      if (response.status === 200) {
        changeText(response.data.text)
        changeResp(true)
      }
    }
  }
  const onClear = () => {
    changeResp(false)
    addShowImage([])
    addImage([])
  }
  return (
    <>
      <Row>
        <Col
          md={2}
          style={{
            background: ` url(frontend/src/side_bg.jpeg)`,
            backgroundSize: '20px 100%',
          }}
        />
        <Col md={8}>
          <form className="form-signin" style={{ marginTop: '5%' }}>
            <p className="display-4">Image to Text Converter</p>
            <Dropdown.Divider />
            <Container>
              <Row>
                <Col>
                  <Typography>Add Images</Typography>
                  <Form>
                    <Form.File id="custom-file" label="Add" custom onChange={ImageTake} />
                    <br />
                    </Form>
                </Col>
              </Row>
              <Row style={{ marginTop: '1%' }}>
                <Button
                  variant="primary"
                  style={{
                    'background-color': '#0579d3',
                    color: '#ffffff',
                    'border-color': '#0579d3',
                  }}
                  onClick={() => submit()}
                >
                  Process
                </Button>
                <Button
                  variant="secondary"
                  style={{
                    'background-color': '#0579d3',
                    color: '#ffffff',
                    'border-color': '#0579d3',
                    marginLeft: "2%"
                  }}
                  onClick={() => onClear()}
                >
                  Clear
                </Button>
              </Row>
              <Dropdown.Divider />
              <Row>
              <Col>
              {showImage.length === 0 ? null : (
                <Carousel
                  style={{
                    maxWidth: '1000px',
                    maxHeight: '750px',
                    textAlign: 'center',
                  }}
                >
                  {showImage.map((image) => (
                    <Carousel.Item>
                      <img
                        style={{ maxWidth: '400px', maxHeight: '200px', minHeight: '200px' }}
                        src={image}
                        className="d-block w-100"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
              </Col>
                    
              <Col>
              {resp ?<Card >
      <CardHeader
        title="Response"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{responseText}
        </Typography>
      </CardContent>
      </Card>:null
      }
              </Col>
              </Row>
            </Container>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default ObjectDetection;
