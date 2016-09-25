import React from 'react';

import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Divider from 'muicss/lib/react/divider';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router';

import styles from '../../styles.css';
import calendarIcon from '../../images/icon_event.png';
import sponsorIcon from '../../images/icon_sponsors.png';
import speakersIcon from '../../images/icon_speakers.png';
import mapImg from '../../images/map.jpg';
import logo from '../../images/organized_g0v.png';
import logoDark from '../../images/g0v_logo_dark.png';
import cafePhiloLogo from '../../images/organized_cafe_philo.png';

export default class SpeakersCH extends React.Component {
  render() {
    return (
      <div>
        <Container className={styles.body}>
          <Row className={styles.pageTop}>
          	<Col md="4" md-offset="4">
          		<img src={calendarIcon} className={styles.icon} />
          		<h3 className={styles.heading}> 講者介紹 </h3>
          		<p className={styles.bodyText}> 這是我們從台灣及美國各地請到.... </p>
          	</Col>
          </Row>
          <Row>
          	<Col md="8" md-offset="2">
          		<div className={styles.greenDivider} />
          	</Col>
          </Row>
          <Row>
          	<Col md="8" md-offset="2">
          		<div className={styles.staffCard}>
          			<h3 className={styles.staffCardHeading}>總招</h3>
          			<p className={styles.staffCardBodyText}>Edward Yen-Ting Liu, Hsin Hsiao </p>
          		</div>
          	</Col>
          	<Col md="8" md-offset="2">
          		<div className={styles.staffCard}>
          			<h3 className={styles.staffCardHeading}>設計組</h3>
          			<p className={styles.staffCardBodyText}>Meng Chih Chien, Tian-Liang Huang, Angel Chen, Tim Lee, Chien-Ju Peng, Shih-Yen Lin, Lu-Ting Feng </p>
          		</div>
          	</Col>
          	<Col md="8" md-offset="2">
          		<div className={styles.staffCard}>
          			<h3 className={styles.staffCardHeading}>公關組</h3>
          			<p className={styles.staffCardBodyText}>Alice Hung, Shun Wang, Iris Shih-Yin Chen, Lala Yao, Hsin-Ling Liao </p>
          		</div>
          	</Col>
          </Row>
        </Container>
      </div>
    );
  }
}