import React, {
  Component,
  Fragment,
} from 'react';

// assets icons
import checkCircle from '../assets/icons/check-circle.svg';
// assets images
import provideImage from '../assets/images/team-work.webp';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Mainpage extends Component {
  state = {
    provide: [
      "High quality beans",
      "Healthy meals, you can request the ingredients",
      "Chat with our staff to get better experience for ordering",
      "Free member card with a minimum purchase of IDR 200.000.",
    ],
  };
  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <section className="bg-main bg-cover bg-center px-22 py-20 text-white font-bold">
            <div className="flex flex-col gap-6 w-[50%] text-sm">
              <h2 className="text-4xl font-bold">
                Start Your Day with Coofee and Good Meals
              </h2>
              <p>
                We provide high quality beans, good taste, and healthy meals
                made by love just for you. Start your day with us for a bigger
                smile!
              </p>
              <div>
                <button className="bg-secondary px-6 py-4 text-[#6A4029] rounded-xl">
                  Get Started
                </button>
              </div>
            </div>
          </section>
          <section className="flex flex-row px-22 py-20 gap-32">
            <div className="flex-1 img">
              <img src={provideImage} alt="" width="100%" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-5">
              <h2 className="text-quartenary font-semibold text-[35px]">
                We Provide Good Coffee and Healthy Meals
              </h2>
              <p className="text-[#4F5665]">
                You can explore the menu that we provide with fun and have their
                own taste and make your day better.
              </p>
              <ul className="flex flex-col max-w-md space-y-1 text-[#4F5665] list-inside gap-4">
                {this.state.provide.map((text) => (
                  <li className="flex items-center gap-4" key={text.id}>
                    <img src={checkCircle} alt="" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default Mainpage;
