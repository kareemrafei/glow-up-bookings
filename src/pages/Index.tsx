// Update this page (the content is just a fallback if you fail to update the page)
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import SalonCard from "../components/SalonCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <Header />
      <div className="my-6">
        <CategoryCard />
        <SalonCard />
      </div>
    </div>
  );
};

export default Index;


