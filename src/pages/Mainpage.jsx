import React, {
  Component,
  Fragment,
} from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

class Mainpage extends Component {
render(){
    return(<Fragment><Header/><main>
    <section className="bg-main bg-cover bg-center px-22 py-20 text-white font-bold">
        <div className="flex flex-col gap-6 w-[50%]">            
            <h2 className="text-4xl font-bold">Start Your Day with Coofee and Good Meals</h2>
            <p>We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!</p>
            <div><button className="bg-secondary px-6 py-4 text-[#6A4029] rounded-xl">Get Started</button></div>
        </div>
        <div>
            
        </div>
    </section></main><Footer/></Fragment>);
}
}

export default Mainpage;