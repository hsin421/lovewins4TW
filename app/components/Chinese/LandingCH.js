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
import uuid from 'uuid/v1';
import axios from 'axios';

export default class LandingCH extends React.Component {
  constructor(prop, context) {
    super(prop, context);
    this.state = {
      uuid: uuid(),
      name: null,
      location: null,
      imgUrl: null,
      comment: null,
      timestamp: new Date().getTime()
    };
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
    this.setState({imgUrl: `https://me-tw-s3-server.herokuapp.com${uploadResult.publicUrl}`})
  }

  _onSave = (event) => {
    event.preventDefault();
    if (this.state.name && this.state.location) {

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
          .then(function (response) {
            console.log(response);
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
              <h1> Check In Your Voice</h1>
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
                  <Col md="5" md-offset="4">
                    <legend><h6 className={styles.formtext}>Take a picture of you holding <a href="https://drive.google.com/file/d/0B98-mdnKh8yRR3R4S0l0eTBHX1U/view" target="_blank">supporting signs</a>!</h6></legend>
                    <ReactS3Uploader
                      signingUrl="https://me-tw-s3-server.herokuapp.com/s3/sign"
                      accept="image/*"
                      onFinish={this._handleUploadFinish}
                      uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
                      contentDisposition="auto"
                    />
                  </Col>
                  <Col md="10" md-offset="1">
                    <legend><h6 className={styles.formtext}>Comment</h6></legend>
                    <Textarea hint="Love is equal. Equal is love." onChange={this._onChangeComment} />
                  </Col>
                  <Col md="5" md-offset="4">
                    <Button className={styles.heroBtn} variant="raised" onClick={this._onSave}>Check In</Button>
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

