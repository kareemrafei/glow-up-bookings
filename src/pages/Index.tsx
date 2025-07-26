import { useState } from "react";
import Header from "../components/ui/Header";
import CategoryCard from "../components/ui/CategoryCard";
import SalonCard from "../components/ui/SalonCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock salon data
  const salons = [
    {
      id: "1",
      name: "Reda's Premium Barbershop",
      location: "Tripoli, Lebanon",
      hours: "10:00 AM - 9:00 PM",
      rating: 4.8,
      reviewCount: 127,
      services: ["Haircuts", "Beard Trim", "Hair Wash"],
      price: "From $25"
    },
    {
      id: "2", 
      name: "Ahmad's Classic Cuts",
      location: "Beirut, Lebanon",
      hours: "9:00 AM - 8:00 PM",
      rating: 4.6,
      reviewCount: 89,
      services: ["Haircuts", "Styling", "Shampoo"],
      price: "From $20"
    },
    {
      id: "3",
      name: "Omar's Modern Salon",
      location: "Sidon, Lebanon", 
      hours: "11:00 AM - 10:00 PM",
      rating: 4.9,
      reviewCount: 156,
      services: ["Haircuts", "Beard Trim", "Hair Treatment"],
      price: "From $30"
    }
  ];

  // Filter salons based on search query
  const filteredSalons = salons.filter(salon =>
    salon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Glow Up Your Look
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Book the best barbers and salons in your area
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for services or locations..."
              className="pl-10 bg-background text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Service</h2>
          <CategoryCard />
        </div>
      </div>

      {/* Featured Salons */}
      <div className="py-12 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Salons</h2>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for barbers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Salon Cards */}
          <div className="space-y-6">
            {filteredSalons.length > 0 ? (
              filteredSalons.map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No barbers found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;




