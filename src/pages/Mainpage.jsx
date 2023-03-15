import React, {
  Component,
  Fragment,
} from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

class Mainpage extends Component {
render(){
    return(<Fragment><Header/><div>Ini Mainpage</div><Footer/></Fragment>);
}
}

export default Mainpage;