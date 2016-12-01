import React from 'react';

import Appbar from 'muicss/lib/react/appbar';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router';
import Button from 'muicss/lib/react/button';
import styles from '../../styles.css';
import logo from '../../images/organized_g0v.png';
import logoDark from '../../images/g0v_logo_dark.png';
import socialFacebook from '../../images/icon_facebook_green.png';
import socialEmail from '../../images/icon_email_green.png';
import socialGithub from '../../images/icon_github_green.png';
import LandingCH from './LandingCH';
import Container from 'muicss/lib/react/container';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

export default class ChPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  handleHamburgerClick = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  render() {
  	const { children } = this.props;
    return (
      <div>
        <Appbar className={styles.bar}>
          <div className={styles.headerContainer}>
            <Row>
              <Col md="2">
                <Link to="/">
                  <img src={'https://media.giphy.com/media/niEaT9ppHmnkI/giphy.gif'} className={styles.appBarLogo}/>
                </Link>
                <span 
                  className={styles.hamburger}
                  onClick={this.handleHamburgerClick}
                >
                  ☰
                </span>
              </Col>
              <Col md="7" className={styles.appBarNav}>
                <a href="https://g0v.hackpad.com/Overseas-Taiwanese-support-amendments-to-Civil-Code-and-uphold-marriage-equality-w1mMW7wbzsu" className={styles.navLink}>活動文案</a>
                <a href="https://g0v.hackpad.com/press-releaseOverseas-Taiwanese-support-amendments-to-Civil-Code--PbUfN8xqVCG" className={styles.navLink}>新聞稿</a>
                <a href="localhost:3000" className={styles.navLink} >串聯地圖</a>
              </Col>
            </Row>
          </div>
        </Appbar>
        {
          this.state.showMenu &&
          <ul className={styles.dropDownUl}>
             <a href="https://g0v.hackpad.com/Overseas-Taiwanese-support-amendments-to-Civil-Code-and-uphold-marriage-equality-w1mMW7wbzsu" className={styles.headerItemResponsive}>活動文案</a>
              <a herf="https://g0v.hackpad.com/press-releaseOverseas-Taiwanese-support-amendments-to-Civil-Code--PbUfN8xqVCG" className={styles.headerItemResponsive}>新聞稿</a>
              <a href="localhost:3000" className={styles.headerItemResponsive} >串聯地圖</a>
          </ul>
        }
       	{children}
          <Appbar className={styles.footer}>
             <Container>
              <Row>
                <Col md="12">
                  <img src={logoDark} height="20px" className={styles.footerLogo}/>
                </Col>
              </Row>
            </Container>
          </Appbar>
      </div>
    );
  }
}