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
                  <img src={'https://scontent-lga3-1.xx.fbcdn.net/t31.0-8/15259269_10210124408658721_4092516313725646947_o.jpg'} className={styles.appBarLogo}/>
                </Link>
                <span 
                  className={styles.hamburger}
                  onClick={this.handleHamburgerClick}
                >
                  ☰
                </span>
              </Col>
            </Row>
          </div>
        </Appbar>
        {
          this.state.showMenu &&
          <ul className={styles.dropDownUl}>
            <li className={styles.headerItemResponsive}>
              <a className={styles.socialIcon} href="https://github.com/hsin421/g0vnyc-landing" target="_blank">看地圖</a>
            </li>
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