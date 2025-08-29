import { Helmet } from "react-helmet";

const SPEW = () => {
  return (
    <>
      <Helmet>
        <title>SPEW - Society for the Promotion of Everyone's Welfare | Dumbledore's Army</title>
        <meta name="description" content="Society for the Promotion of Everyone's Welfare - A community for the betterment of you. Founded by Jiya Doshi, addressing global issues to increase awareness and improve conditions." />
      </Helmet>
      
      <div className="min-h-screen pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-magical bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              SPEW
            </h1>
            <h2 className="text-xl md:text-2xl text-white mb-8 font-medium">
              Society for the Promotion of Everyone's Welfare
            </h2>
            <div className="prose prose-lg max-w-none text-white">
              <p className="text-lg leading-relaxed">
                A community for the betterment of you and the world around you. Founded by <strong>Jiya Doshi</strong>, this is a space that addresses global issues around us, aiming to increase awareness, educate, campaign and improve the current global conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SPEW;