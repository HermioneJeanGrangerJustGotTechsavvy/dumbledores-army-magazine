
import { useState, useEffect } from "react";

const About = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className={`text-center mb-12 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">About Us</h1>
      </div>
      
      <div className={`bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg p-8 shadow-lg mb-12 transition-all duration-700 delay-150 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <p className="text-white text-lg mb-6">
          Did you sit anxiously in front of the fireplace or wait for owls to show up when you turned 11? Well, we did too! 
          Alas, our official Hogwarts letter never arrived, so we decided to take matters into our own hands - presenting Dumbledore's Army Magazine, where potterheads unite.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
        <p className="text-white mb-4">
          If you want to reach out to us, you can do so via either of these channels:
        </p>
        <ul className="text-white space-y-2">
          <li className="flex items-center">
            <span className="font-bold mr-2">Instagram:</span> 
            <a href="https://instagram.com/dumbledoresarmymagazine" className="text-white hover:underline transition-all">
              @dumbledoresarmymagazine
            </a>
          </li>
          <li className="flex items-center">
            <span className="font-bold mr-2">Email:</span> 
            <a href="mailto:dumbledoresarmymagazine@gmail.com" className="text-white hover:underline transition-all">
              dumbledoresarmymagazine@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
