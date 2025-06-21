import { useState , useEffect } from 'react'
import { useUser } from '@clerk/clerk-react';
import { Car, MapPin, Clock, Shield, Phone, MessageSquare, WrenchIcon, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate ,useLocation} from 'react-router-dom'
import banner from '../data/banner.json'
import { supabase } from '../lib/supabaseClient'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function Home() {
  const [location, setLocation] = useState('')
  const navigate = useNavigate();
  const { user , isSignedIn } = useUser();
 useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        // Check if user exists
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('clerk_id', user.id)
          .single();

        if (!data) {
          // If not, insert
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

  const services = [
    { 
      title: "Breakdown Assistance",
      description: "Get immediate help for vehicle breakdowns including battery, tire, and engine issues",
      icon: <Car className="h-10 w-10 text-primary" />,
    },
    { 
      title: "Quick Repairs", 
      description: "On-site troubleshooting and repairs to get you back on the road fast",
      icon: <WrenchIcon className="h-10 w-10 text-primary" />
    },
    { 
      title: "24/7 Support",
      description: "Round-the-clock emergency assistance whenever you need it",
      icon: <Clock className="h-10 w-10 text-primary" />
    }
  ]

  const features = [
    { 
      title: "Locate Nearby Mechanics", 
      description: "Find qualified mechanics within minutes of your location",
      icon: <MapPin />
    },
    { 
      title: "Real-Time Communication", 
      description: "Direct messaging with mechanics to explain your situation",
      icon: <MessageSquare />
    },
    { 
      title: "Instant Response", 
      description: "Average response time under 5 minutes in most service areas",
      icon: <Phone />
    },
    { 
      title: "Verified Professionals", 
      description: "All mechanics are background-checked and certified",
      icon: <Shield />
    }
  ]

  const testimonials = [
    {
      name: "Sarah T.",
      role: "Driver",
      comment: "Roadhelp saved me when my car broke down on the highway. A mechanic arrived within 15 minutes and fixed my flat tire!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      name: "Michael R.",
      role: "Commuter",
      comment: "Battery died in a shopping center parking lot. Used Roadhelp and had someone jump start my car within minutes. Incredible service!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    {
      name: "Chris B.",
      role: "Mechanic Partner",
      comment: "As a mechanic, Roadhelp has helped grow my business by connecting me with people who need immediate assistance in my area.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop"
    }
  ]

  const handleFindHelp = () => {
   if (!isSignedIn) {
    navigate('/?sign-in=true');
  } else {
    navigate('/find-help');
  }
  }

  const handleUseCurrentLocation = () => {
    //  if (!isSignedIn) {
    // navigate('/?sign-in=true');
//   } else {
    setLocation("Greater Noida")
//   }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden w-full">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-10 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <Badge className="bg-amber-500 text-white hover:bg-amber-600">24/7 Roadside Assistance</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Roadside Help When You Need It Most
            </h1>
            <p className="text-lg text-slate-300 max-w-lg">
              Connect instantly with nearby mechanics for emergencies. Get back on the road faster with our network of reliable professionals.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter your location"
                  className="pl-3 pr-12 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-md"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Button 
  size="sm"
  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-white text-black hover:bg-slate-200 hover:text-black px-3 py-1 rounded"
  onClick={handleUseCurrentLocation}
>
  Use Current
</Button>


              </div>
    <Button
    size="lg"
    variant="ghost" // important to remove default bg
    onClick={handleFindHelp}
    className="!bg-amber-500 !text-white !hover:bg-amber-600 !hover:text-white px-6 py-3 rounded"
    >
    Find Help Now
    </Button>
            </div>
            <p className="text-sm text-slate-400">Average response time: less than 5 minutes</p>
          </div>
       <div className="lg:w-1/2 relative mt-8 lg:mt-0">
  <img 
    src="..."
    alt="Roadside assistance mechanic helping a driver"
    className="rounded-lg shadow-2xl w-full py-24"
  />
  <div className="absolute bottom-4 left-4 bg-white text-black p-4 rounded-lg shadow-lg hidden md:block">
    <div className="flex items-center gap-3">
      <div className="bg-green-500 rounded-full w-3 h-3 animate-pulse"></div>
      <span className="font-medium">32 mechanics available nearby</span>
    </div>
  </div>
</div>
</div>
      </section>
      <Carousel
  plugins={[
    Autoplay({
      delay: 2000,
    }),
  ]}
  className="w-full py-10"
>
  <CarouselContent className="flex gap-4 sm:gap-10 items-center">
    {banner.map(({ name, id, path }) => (
      <CarouselItem key={id} className="basis-full sm:basis-1/3 lg:basis-1/4">
        <img
          src={path}
          alt={name}
          className="h-28 sm:h-24 object-contain mx-auto"
        />
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
 

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Roadside Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick, reliable services to get you back on the road safely, no matter where you are or what time it is.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Roadhelp Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get help in three simple steps - locate, connect, and get back on the road.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">1</div>
                <div className="hidden md:block absolute top-1/2 -right-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-1 rounded-full border border-slate-200">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Request Assistance</h3>
              <p className="text-muted-foreground">Share your location and describe your vehicle issue in the app</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">2</div>
                <div className="hidden md:block absolute top-1/2 -right-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-1 rounded-full border border-slate-200">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Connect with Mechanics</h3>
              <p className="text-muted-foreground">Nearby mechanics will respond with estimated arrival times and rates</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">3</div>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Back on the Road</h3>
              <p className="text-muted-foreground">Your selected mechanic arrives to fix your vehicle at your location</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Roadhelp</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              We provide a reliable platform connecting you with qualified mechanics for prompt roadside assistance.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <div className="mb-4 p-2 bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real experiences from drivers and mechanics who use Roadhelp.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 flex flex-col">
                <div className="flex items-start mb-4 gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">{testimonial.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-primary-foreground text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready for Roadside Assistance?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Don't wait until you're stranded. Download Roadhelp now and have peace of mind wherever you drive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="border-white text-black hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-8 bg-slate-900 text-slate-300">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#careers" className="hover:text-white">Careers</a></li>
                <li><a href="#press" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#breakdown" className="hover:text-white">Breakdown Assistance</a></li>
                <li><a href="#battery" className="hover:text-white">Battery Service</a></li>
                <li><a href="#tire" className="hover:text-white">Flat Tire Change</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">For Mechanics</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#join" className="hover:text-white">Join Our Network</a></li>
                <li><a href="#benefits" className="hover:text-white">Partner Benefits</a></li>
                <li><a href="#resources" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#help" className="hover:text-white">Help Center</a></li>
                <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
                <li><a href="#faq" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <WrenchIcon className="h-6 w-6 text-white" />
              <span className="font-bold text-white">Roadhelp</span>
            </div>
            <div className="text-sm">© {new Date().getFullYear()} Roadhelp. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home;
