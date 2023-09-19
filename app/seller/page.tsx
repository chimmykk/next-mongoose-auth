import Link from "next/link";
const BecomeSeller = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen bg-white text-bgDark flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Join Our Community of Sellers</h1>
        <p className="text-lg md:text-3xl mb-8">Turn Your Passion into Profit</p>
        <Link href="#apply" className=" button border bg-bgGreen border-black text-bgDark text-xl font-semibold rounded">
          Apply to Sell!
        </Link>
      </section>

      {/* Introduction Section */}
      <section className="bg-bgDark text-white py-16 flex flex-col justify-center items-center">
        <div className="container mx-auto text-center flex flex-col">
          <h2 className="text-3xl font-semibold mb-4">Why Become a Seller?</h2>
          <p className="text-lg mb-8">
            Becoming a seller on our platform opens up exciting opportunities to earn money, reach a broader audience, and showcase your products to the world.
          </p>
        </div>
      </section>

      {/* Steps to Become a Seller Section */}
      <section className="bg-white py-16 flex flex-col justify-center items-center">
        <div className="container mx-auto text-center flex flex-col">
          <h2 className="text-3xl font-semibold mb-4">How to Start Selling</h2>
          <ul className="list-disc list-inside text-left mx-auto  text-lg mb-8">
            <li>Sign up or log in to your account.</li>
            <li>Complete your seller profile.</li>
            <li>Provide essential seller information.</li>
            <li>Start listing your products.</li>
          </ul>
        </div>
      </section>

      {/* Tips for Success Section */}
      <section className="bg-bgGreen text-white py-16 flex flex-col justify-center items-center">
        <div className="container mx-auto text-center flex flex-col">
          <h2 className="text-3xl font-semibold mb-4">Tips for Success</h2>
          <ul className="list-disc list-inside text-left mx-auto  text-lg mb-8">
            <li>High-quality product images attract more buyers.</li>
            <li>Write clear and compelling product descriptions.</li>
            <li>Set competitive prices to maximize sales.</li>
            <li>Engage with your audience during live streams.</li>
          </ul>
        </div>
      </section>

      {/* Benefits of Selling Section */}
      <section className="bg-white py-16 flex flex-col justify-center items-center">
        <div className="container mx-auto text-center flex flex-col">
          <h2 className="text-3xl font-semibold mb-4">Benefits of Selling on Our Platform</h2>
          <ul className="list-disc list-inside text-lg mb-8 text-left mx-auto">
            <li>Access to a large and engaged customer base.</li>
            <li>Secure and reliable payment processing.</li>
            <li>Promotional tools to boost your sales.</li>
            <li>Real-time analytics to track your performance.</li>
          </ul>
        </div>
      </section>

      {/* Contact or Apply Section */}
      <section id="apply" className="bg-bgDark py-16 text-white flex flex-col justify-center items-center">
        <div className="container mx-auto text-center justify-center items-center flex flex-col">
          <h2 className="text-3xl font-semibold mb-4">Ready to Start Selling?</h2>
          <Link href="" className="bg-bgGreen inline-block text-white font-semibold py-2 px-4 rounded">
            Apply to Sell Now! 
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
