import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Car, MapPin, Clock, Shield, Phone, MessageSquare, WrenchIcon, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import banner from '../data/banner.json';
import { supabase } from '../lib/supabaseClient';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  // === Define all refs ===
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const stepsRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  // === Insert user if not exist ===
  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('clerk_id', user.id)
          .single();

        if (!data) {
          const { error: insertError } = await supabase.from('users').insert({
            name: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
            clerk_id: user.id,
          });
          if (insertError) console.error(insertError);
        }
      }
    };
    syncUser();
  }, [isSignedIn, user]);

  // === GSAP animations ===
  useGSAP(() => {
    // HERO fade up
    gsap.from(heroRef.current.querySelectorAll('.fade-up'), {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Services
    gsap.from(servicesRef.current.querySelectorAll('.service-card'), {
      scrollTrigger: {
        trigger: servicesRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    });

    // Steps
    gsap.from(stepsRef.current.querySelectorAll('.step'), {
      scrollTrigger: {
        trigger: stepsRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    });

    // Features
    gsap.from(featuresRef.current.querySelectorAll('.feature'), {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top 80%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)',
    });

    // Testimonials
    gsap.from(testimonialsRef.current.querySelectorAll('.testimonial'), {
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, []);

  const handleFindHelp = () => {
    if (!isSignedIn) {
      navigate('/?sign-in=true');
    } else {
      navigate('/find-help');
    }
  };

  const handleUseCurrentLocation = () => {
    setLocation("Greater Noida");
  };

  // === Your data ===
  const services = [
    {
      title: "Breakdown Assistance",
      description: "Immediate help for vehicle breakdowns.",
      icon: <Car className="h-10 w-10 text-primary" />,
    },
    {
      title: "Quick Repairs",
      description: "On-site troubleshooting to get you back fast.",
      icon: <WrenchIcon className="h-10 w-10 text-primary" />,
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock emergency help.",
      icon: <Clock className="h-10 w-10 text-primary" />,
    },
  ];

  const features = [
    {
      title: "Locate Nearby Mechanics",
      description: "Find qualified mechanics within minutes.",
      icon: <MapPin />,
    },
    {
      title: "Real-Time Communication",
      description: "Direct messaging with mechanics.",
      icon: <MessageSquare />,
    },
    {
      title: "Instant Response",
      description: "Average response under 5 minutes.",
      icon: <Phone />,
    },
    {
      title: "Verified Professionals",
      description: "All mechanics are background-checked.",
      icon: <Shield />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah T.",
      role: "Driver",
      comment: "Roadhelp saved me when my car broke down!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    {
      name: "Michael R.",
      role: "Commuter",
      comment: "Battery died — help arrived in minutes.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    {
      name: "Chris B.",
      role: "Mechanic Partner",
      comment: "Roadhelp helped grow my business!",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    },
  ];

  // === JSX ===
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* HERO */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
  <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
    {/* Left Text Block */}
    <div className="lg:w-1/2 space-y-6">
      <Badge className="bg-amber-500 text-white fade-up">24/7 Roadside Assistance</Badge>
      <h1 className="text-4xl lg:text-6xl font-bold fade-up">Roadside Help When You Need It Most</h1>
      <p className="text-lg text-slate-300 fade-up">Connect instantly with nearby mechanics for emergencies.</p>
      <div className="flex flex-col sm:flex-row gap-4 fade-up">
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location 📍"
        />
        <Button onClick={handleUseCurrentLocation} className="text-black">
          Use Current
        </Button>
        <Button 
          onClick={handleFindHelp} 
          className="!bg-red-600 hover:!bg-red-700 text-white"
        >
          Find Help Now
        </Button>
      </div>
      <p className="text-sm text-slate-400 fade-up">
        Average response time: less than 5 minutes
      </p>
    </div>

    {/* Right Image Block */}
    <div className="lg:w-1/2 flex justify-center fade-up">
      <img
        src="/logotiny.png"
        alt="Roadhelp Logo"
        className="max-w-xs md:max-w-sm lg:max-w-md"
      />
    </div>
  </div>
</section>


      {/* BANNER */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className="flex gap-4">
          {banner.map(b => (
            <CarouselItem key={b.id} className="basis-full sm:basis-1/3 lg:basis-1/4">
              <img src={b.path} alt={b.name} className="h-28 object-contain mx-auto" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* SERVICES */}
      <section ref={servicesRef} className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Roadside Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <Card key={i} className="p-6 text-center service-card">
                <div>{s.icon}</div>
                <h3 className="text-xl font-bold mt-4">{s.title}</h3>
                <p>{s.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section ref={stepsRef} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How Roadhelp Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[1, 2, 3].map(num => (
              <div key={num} className="step">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto">{num}</div>
                <h3 className="mt-4 font-bold">Step {num}</h3>
                <p>Step {num} description here.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Roadhelp</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-6 bg-slate-800 rounded-lg feature">
                <div className="mb-4">{f.icon}</div>
                <h3 className="font-bold">{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialsRef} className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-6 testimonial">
                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <h4 className="font-bold">{t.name}</h4>
                <p className="text-sm">{t.role}</p>
                <p className="mt-2 italic">{t.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
 export default Home;