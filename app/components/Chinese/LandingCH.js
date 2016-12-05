import React from 'react';

import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Container from 'muicss/lib/react/container';
import Divider from 'muicss/lib/react/divider';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router';

import styles from '../../styles.css';
import ReactS3Uploader from 'react-s3-uploader';
import S3Uploader from 'react-s3-uploader/s3upload';
import uuid from 'uuid/v1';
import axios from 'axios';
import loadingGif from '../../images/loading.gif';

export default class LandingCH extends React.Component {
  constructor(prop, context) {
    super(prop, context);
    this.state = {
      uuid: uuid(),
      name: null,
      location: null,
      imgUrl: null,
      comment: null,
      isUsingProfilePic: false,
      timestamp: new Date().getTime()
    };

    this.fileObjectUrl = '';
  }

  componentDidMount() {
    setInterval(() => {
      if (window.USER_IMAGE_PROCESSED_FILE && !this.state.isUsingProfilePic) {
        const myFile = window.USER_IMAGE_PROCESSED_FILE;
        this.fileObjectUrl = window.URL.createObjectURL(myFile);
        this.setState({ isUsingProfilePic: true });
        const S3Upload = new S3Uploader({
            signingUrl: "https://me-tw-s3-server.herokuapp.com/s3/sign",
            onFinishS3Put: this._handleUploadFinish,
            uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
            contentDisposition: "auto"
        });
        S3Upload.uploadFile(myFile);
      }
    }, 1000)
  }

  _onChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  _onChangeLocation = (event) => {
    this.setState({location: event.target.value});
  }

  _onChangeComment = (event) => {
    this.setState({comment: event.target.value});
  }

  _handleUploadFinish = (uploadResult) => {
    const imgUrl = `https://me-tw-s3-server.herokuapp.com${uploadResult.publicUrl}`;
    this.setState({ imgUrl });
  }

  _handlePreprocess = (file, next) => {
    const fr = new FileReader();
    const createImage = () => {
      var img = new Image();
      img.src = fr.result;
      window.S3_USER_IMAGE_UPLOAD = img;
    }
    fr.onload = createImage;
    fr.readAsDataURL(file);
    next(file);
  }

  _onSave = (event) => {
    event.preventDefault();
    if (this.state.name && this.state.location) {
      this.setState({ isStartSaving: true });
      setTimeout(() => {
        if (!this.state.isSuccess) {
          alert('Oops, something went wrong. Please turn on your location in privacy setting and refresh to try again :(')
        }
      }, 6000);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => { 
          this.setState({ hasCompleted: true });
          axios.post('https://5bq2v7mgi5.execute-api.us-east-1.amazonaws.com/prod/mySimpleBE', {
            "Item": { 
              ...this.state,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            "TableName": "ME-TW"
          })
          .then((response) => {
            if (response.status === 200) {
              this.setState({ isSuccess: true });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    
        })
      } else {
        alert('We were unable to get your position and check you in at this time :(');
      }
    } else {
      alert('Please enter your name and location. ')
    }
  }

  render() {
    return (
      <div>
        <div className={styles.hero}></div>
        <Container className={styles.landingBody}>
        	<Row>
	           <Col md="8" md-offset="2">
              <h1 id="check-in"> Check In Your Voice</h1>
              {this.state.hasCompleted ? 
                ( <div style={{ height: 400 }}>
                    <h2> Thank you for your support! </h2>
                    <p> See who else stands with you <a href="http://map.marriageforall.org/map/main">around the world</a><img src="http://www.iconarchive.com/download/i87619/icons8/ios7/Arrows-Right.ico" width={20} /> </p>
                  </div>)
                :
                (
                <Form>
                  <Col md="5" md-offset="1">
                    <legend><h6 className={styles.formtext}>Name</h6></legend>
                    <Input hint="James" onChange={this._onChangeName}/>
                  </Col>
                  <Col md="5" md-offset="1">
                    <legend><h6 className={styles.formtext}>Location</h6></legend>
                    <Input hint="New York City" onChange={this._onChangeLocation} />
                  </Col>
                  <Col md="8" md-offset="2">
                    <legend>
                      <h2> Show Your Support </h2>
                      <h6 className={styles.formtext}>Use our <a href="#content"> profile generator 大頭貼產生器</a> 
                      <br /> Or upload/take a picture of yourself holding <a href="https://drive.google.com/file/d/0B98-mdnKh8yRR3R4S0l0eTBHX1U/view" target="_blank">supporting signs</a>!
                      </h6>
                    </legend>
                    {this.state.isUsingProfilePic ?
                      <img src={this.fileObjectUrl} width="50%" />
                      :
                      <ReactS3Uploader
                        style={{marginLeft: '30%'}}
                        signingUrl="https://me-tw-s3-server.herokuapp.com/s3/sign"
                        accept="image/*"
                        onFinish={this._handleUploadFinish}
                        preprocess={this._handlePreprocess}
                        uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
                        contentDisposition="auto"
                      />
                    }
                    {(this.state.imgUrl && !this.state.isUsingProfilePic) && <img src={this.state.imgUrl} width="50%" />}
                  </Col>
                  <Col md="10" md-offset="1">
                    <legend><h6 className={styles.formtext} style={{marginTop: 50}}>Comment</h6></legend>
                    <Textarea hint="Love is equal. Equal is love." onChange={this._onChangeComment} />
                  </Col>
                  <Col md="5" md-offset="4">
                    {!this.state.isStartSaving ?
                      <Button className={styles.heroBtn} variant="raised" onClick={this._onSave}>Check In</Button>
                      :
                      <img src={loadingGif} width="20%" />
                    }
                    <p> After clicking check-in, you'll be asked to permit sharing your location. We will only use your approximate location. </p>
                    <p> Turn on location service on your phone if nothing happens after clicking XD </p>
                  </Col>
                  </Form>)
                }
             </Col>
      		</Row>
        </Container>
			</div>
		);
	}
}

