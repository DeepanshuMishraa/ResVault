import { motion } from "framer-motion";
import { Upload, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b motion-preset-focus font-raleway duration-200 from-gray-50 to-white py-20 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover and Share Knowledge
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore a world of resources on various topics. Learn, contribute,
            and grow together in our community-driven platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 text-center p-4"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col mt-8 md:flex-row justify-center items-center gap-6"
        >
          <FeatureCard
            icon={<Book className="w-8 h-8 text-blue-500" />}
            title="Explore Resources"
            description="Browse through a vast collection of curated resources on various topics."
          />
          <FeatureCard
            icon={<Upload className="w-8 h-8 text-green-500" />}
            title="Contribute Knowledge"
            description="Share your expertise by uploading resources and helping others learn."
          />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
    className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full"
  >
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default Hero;
