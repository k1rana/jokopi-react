import React, {
  Component,
  Fragment,
} from 'react';

import { Link } from 'react-router-dom';

// assets icons
import checkCircle from '../assets/icons/check-circle.svg';
import checkIcon from '../assets/icons/check.svg';
import loveIcon from '../assets/icons/love.svg';
import placeIcon from '../assets/icons/place.svg';
import starIcon from '../assets/icons/star.svg';
import staffIcon from '../assets/icons/user.svg';
import mapImage from '../assets/images/global.svg';
import phProfile from '../assets/images/placeholder-profile.jpg';
import productImage1 from '../assets/images/product-1.webp';
// assets images
import provideImage from '../assets/images/coffee-gear-GettyImages-879468816.jpg';
// components
import Footer from '../components/Footer';
import Header from '../components/Header';

class Mainpage extends Component {
  state = {
    provide: [
      "Placeholder text 1",
      "Placeholder text 2",
      "Placeholder text 3",
      "Placeholder text 4",
    ],
    reviews: [
      {
        name: "Placeholder Name 1",
        text: "Placeholder review text 1.",
      },
      {
        name: "Placeholder Name 2",
        text: "Placeholder review text 2.",
      },
      {
        name: "Placeholder Name 3",
        text: "Placeholder review text 3.",
      },
    ],
  };

  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <section className="bg-main bg-cover bg-center py-20 text-white font-bold">
            <div className="global-px">
              <div className="flex flex-col gap-6 w-[75%] lg:w-[50%] text-sm">
                <h2 className="text-4xl font-bold">
                  Placeholder Heading
                </h2>
                <p>
                  Placeholder paragraph text. Placeholder paragraph text. Placeholder paragraph text.
                </p>
                <div className="mt-5">
                  <Link
                    className="bg-secondary px-6 py-4 text-[#6A4029] rounded-xl"
                    to={"/products/"}
                  >
                    Placeholder Button
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col lg:flex-row global-px py-20 lg:gap-32">
            <div className="flex-1 img">
              <img src={provideImage} alt="Provide" width="100%" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-5">
              <h2 className="text-quartenary font-semibold text-[35px]">
                Placeholder Subheading
              </h2>
              <p className="text-[#4F5665]">
                Placeholder paragraph text. Placeholder paragraph text. Placeholder paragraph text.
              </p>
              <ul className="flex flex-col max-w-md space-y-1 text-[#4F5665] list-inside gap-4">
                {this.state.provide.map((text, idx) => (
                  <li className="flex items-center gap-4" key={idx}>
                    <img src={checkIcon} alt="Check" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="global-px py-8 md:py-20">
            <div className="flex flex-col items-center mb-8 md:mb-20">
              <h2 className="text-4xl text-quartenary font-semibold mb-5 text-center">
                Placeholder Heading
                <br />
                Placeholder Subheading
              </h2>
              <p className="text-base text-gray-700 text-center">
                Placeholder paragraph text. Placeholder paragraph text. Placeholder paragraph text.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-secondary text-tertiary px-9 py-3 rounded-3xl font-bold">
                Placeholder Button
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default Mainpage;