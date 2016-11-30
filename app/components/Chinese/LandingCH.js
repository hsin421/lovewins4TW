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

export default class LandingCH extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.hero}></div>
        <Container className={styles.landingBody}>
        	<Row>
	           <Col md="8" md-offset="2">
              <h1> 我要Check In聲援</h1>
              <Form>
                  <Col md="5" md-offset="1">
                    <legend><h6 className={styles.formtext}>Name</h6></legend>
                    <Input hint="James" onChange={this._onChangeOrg}/>
                  </Col>
                  <Col md="5" md-offset="1">
                    <legend><h6 className={styles.formtext}>Location</h6></legend>
                    <Input hint="New York City" onChange={this._onChangeUrl} />
                  </Col>
                  <Col md="5" md-offset="4">
                    <legend><h6 className={styles.formtext}>Upload a picture</h6></legend>
                    <ReactS3Uploader
                      signingUrl="http://localhost:3001/s3/sign"
                      accept="image/*"
                      uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
                      contentDisposition="auto"
                    />
                  </Col>
                  <Col md="10" md-offset="1">
                    <legend><h6 className={styles.formtext}>Comment</h6></legend>
                    <Textarea hint="Love is equal. Equal is love." onChange={this._onChangeSituation} />
                  </Col>
                  <Col md="5" md-offset="4">
                    <Button className={styles.heroBtn} variant="raised" onClick={this._onSave}>Check In</Button>
                  </Col>
                  </Form>
             </Col>
      		</Row>
        </Container>
			</div>
		);
	}
}

