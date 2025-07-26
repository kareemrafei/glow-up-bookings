import Header from "../components/ui/Header";
import CategoryCard from "../components/ui/CategoryCard";
import SalonCard from "../components/ui/SalonCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
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
          <div className="space-y-6">
            <SalonCard />
            <SalonCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;




