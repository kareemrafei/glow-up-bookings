import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Calendar, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-background border-b border-border p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>
          GlowUp
        </h1>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/booking")}>
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

