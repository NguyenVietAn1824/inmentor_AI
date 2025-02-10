import { Sparkles } from "lucide-react";
import Marquee from "react-fast-marquee";

import { Container } from "../components/container";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const MarqueeImg = ({ img }: { img: string }) => (
  <div className="mx-8">
    <img src={img} alt="" className="h-12 w-auto object-contain" />
  </div>
);

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all border">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <Container className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Master Your 
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}Interview Skills
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
              Level up your interview performance with AI-powered practice, real-time feedback, 
              and personalized coaching.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center px-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Try Now <Sparkles className="ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto px-4">
            {[
              { number: "250k+", label: "Offers Received" },
              { number: "1.2M+", label: "Interviews Aced" },
              { number: "98%", label: "Success Rate" },
              { number: "24/7", label: "AI Support" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-blue-600">{stat.number}</div>
                <div className="mt-2 text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Features Grid */}
      <Container className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Everything you need to succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              title="AI Interview Practice"
              description="Practice with our AI interviewer that adapts to your responses and provides instant feedback."
            />
            <FeatureCard
              title="Custom Questions"
              description="Get personalized questions based on your industry, role, and experience level."
            />
            <FeatureCard
              title="Real-time Analytics"
              description="Track your progress and identify areas for improvement with detailed performance metrics."
            />
          </div>
        </div>
      </Container>

      {/* Marquee Section */}
      <div className="w-full bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-gray-600 mb-8 px-4">
            Trusted by leading companies
          </h3>
          <Marquee pauseOnHover gradient gradientWidth={100} className="py-4">
            <MarqueeImg img="/assets/img/logo/firebase.png" />
            <MarqueeImg img="/assets/img/logo/meet.png" />
            <MarqueeImg img="/assets/img/logo/zoom.png" />
            <MarqueeImg img="/assets/img/logo/firebase.png" />
            <MarqueeImg img="/assets/img/logo/microsoft.png" />
            <MarqueeImg img="/assets/img/logo/meet.png" />
            <MarqueeImg img="/assets/img/logo/tailwindcss.png" />
            <MarqueeImg img="/assets/img/logo/microsoft.png" />
          </Marquee>
        </div>
      </div>

      {/* CTA Section */}
      <Container className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Ready to transform your interview skills?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful candidates who have mastered their interview skills with our AI-powered platform.
            </p>
            <Link to="/generate">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
                Get Started <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
