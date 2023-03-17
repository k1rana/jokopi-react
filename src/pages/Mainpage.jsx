import React, { Component, Fragment } from "react";

// assets icons
import checkCircle from "../assets/icons/check-circle.svg";
import checkIcon from "../assets/icons/check.svg";
import mapImage from "../assets/images/global.svg";
import amazonLogo from "../assets/images/partners/amazon.svg";
import discordLogo from "../assets/images/partners/discord.svg";
import netflixLogo from "../assets/images/partners/netflix.svg";
import redditLogo from "../assets/images/partners/reddit.svg";
import spotifyLogo from "../assets/images/partners/spotify.svg";
import productImage1 from "../assets/images/product-1.webp";
// assets images
import provideImage from "../assets/images/team-work.webp";
// components
import Footer from "../components/Footer";
import Header from "../components/Header";

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
          <section className="px-22 py-20">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl text-quartenary font-semibold mb-5 text-center">
                Here is People’s Favorite
              </h2>
              <p className="text-base text-gray-700 text-center">
                Let’s choose and have a bit taste of poeple’s favorite. It might
                be yours too!
              </p>
            </div>
            <div className="flex flex-row justify-center gap-12 mt-20">
              <div className="flex-1 flex flex-col justify-center border-gray-400 border rounded-xl px-5 py-12 items-center gap-5 text-base">
                <img
                  src={productImage1}
                  alt=""
                  width="140px"
                  className="rounded-full mb-7"
                />
                <h3 className="text-lg font-medium">Hazelnut Latte</h3>
                <ul className="flex flex-col gap-5 mb-20">
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Hazelnut Syrup
                  </li>
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Wanilla Whipped Cream
                  </li>
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Ice / Hot
                  </li>
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Sliced Banana on Top
                  </li>
                </ul>
                <p className="font-medium text-2xl">IDR 25.000</p>
                <button className="bg-secondary text-tertiary px-9 py-3 rounded-3xl font-bold">
                  Order Now
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center border-gray-400 border rounded-xl px-5 py-12 items-center gap-5 text-base">
                <img
                  src={productImage1}
                  alt=""
                  width="140px"
                  className="rounded-full mb-7"
                />
                <h3 className="text-lg font-medium">Hazelnut Latte</h3>
                <ul className="flex flex-col gap-5 mb-20">
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Hazelnut Syrup
                  </li>
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Wanilla Whipped Cream
                  </li>
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Ice / Hot
                  </li>
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Sliced Banana on Top
                  </li>
                </ul>
                <p className="font-medium text-2xl">IDR 25.000</p>
                <button className="bg-secondary text-tertiary px-9 py-3 rounded-3xl font-bold">
                  Order Now
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center border-gray-400 border rounded-xl px-5 py-12 items-center gap-5 text-base">
                <img
                  src={productImage1}
                  alt=""
                  width="140px"
                  className="rounded-full mb-7"
                />
                <h3 className="text-lg font-medium">Hazelnut Latte</h3>
                <ul className="flex flex-col gap-5 mb-20">
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Hazelnut Syrup
                  </li>
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Wanilla Whipped Cream
                  </li>
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Ice / Hot
                  </li>
                  <li className="flex items-center gap-4">
                    <img src={checkIcon} alt="" /> Sliced Banana on Top
                  </li>
                </ul>
                <p className="font-medium text-2xl">IDR 25.000</p>
                <button className="bg-secondary text-tertiary px-9 py-3 rounded-3xl font-bold">
                  Order Now
                </button>
              </div>
            </div>
          </section>
          <section className="px-22 py-20">
            <div className="flex flex-col items-center mb-20">
              <h2 className="text-4xl text-quartenary font-semibold mb-5 text-center">
                Visit Our Store in
                <br />
                the Spot on the Map Below
              </h2>
              <p className="text-base text-gray-700 text-center">
                See our store in every city on the spot and spen your good day
                there. See you soon!
              </p>
            </div>
            <div className="mt-10">
              <img src={mapImage} alt="global map" />
            </div>
          </section>
          <section className="px-22 py-20">
            <div className="flex flex-col items-center mb-20">
              <h2 className="text-4xl text-quartenary font-semibold mb-5 text-center">
                Our Partner
              </h2>
            </div>
            <div className="flex flex-row justify-center items-center gap-12 ">
              <img
                src={netflixLogo}
                alt=""
                width="190px"
                className="w-[15%] aspect-[3/2] object-contain grayscale opacity-20 duration-300 hover:filter-none hover:opacity-100"
              />
              <img
                src={redditLogo}
                alt=""
                width="190px"
                className="w-[15%] aspect-[3/2] object-contain grayscale opacity-20 duration-300 hover:filter-none hover:opacity-100"
              />
              <img
                src={amazonLogo}
                alt=""
                width="190px"
                className="w-[15%] aspect-[3/2] object-contain grayscale opacity-20 duration-300 hover:filter-none hover:opacity-100"
              />
              <img
                src={discordLogo}
                alt=""
                width="190px"
                className="w-[15%] aspect-[3/2] object-contain grayscale opacity-20 duration-300 hover:filter-none hover:opacity-100"
              />
              <img
                src={spotifyLogo}
                alt=""
                width="190px"
                className="w-[15%] aspect-[3/2] object-contain grayscale opacity-20 duration-300 hover:filter-none hover:opacity-100"
              />
            </div>
          </section>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default Mainpage;
