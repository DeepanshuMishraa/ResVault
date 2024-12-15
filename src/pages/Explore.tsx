import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Loader2, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

interface Resource {
  id: string;
  name: string;
  fileUrl: string;
  description?: string;
  links?: string[];
  category: {
    name: string;
  };
  user: {
    name: string;
  };
}

interface Category {
  name: string;
  resource: Resource[];
}

const Explore = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/explore");
      const data = await response.json();
      setResources(data.feed);

      const uniqueCategories = Array.from(
        new Set(data.feed.map((r: Resource) => r.category?.name))
      ).filter(Boolean);

      setCategories(
        uniqueCategories.map((name) => ({
          name: name as string,
          resource: data.feed.filter(
            (r: Resource) => r.category?.name === name
          ),
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setLoading(false);
    }
  };

  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-raleway">
      <Navbar />
      <div className="container mx-auto py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">
            Explore Resources
          </h1>

          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search resources..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.name} value={category.name}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground mt-8">
                  No resources found
                </p>
              )}
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category.name} value={category.name}>
                {category.resource.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {category.resource
                      .filter((resource) =>
                        resource.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground mt-8">
                    No resources found in this category
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const renderFilePreview = () => {
    if (!resource.fileUrl) {
      return (
        <div className="text-sm text-muted-foreground mb-4">
          No preview available
        </div>
      );
    }

    const fileUrl = resource.fileUrl;
    if (fileUrl.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return (
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
          <img
            src={fileUrl}
            alt={resource.name}
            className="object-cover w-full h-full"
          />
        </div>
      );
    } else if (fileUrl.match(/\.(mp4|webm)$/i)) {
      return (
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
          <video controls className="w-full h-full object-cover">
            <source src={fileUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (fileUrl.match(/\.pdf$/i)) {
      return (
        <div className="flex items-center gap-2 mb-4 p-3 bg-secondary rounded-lg">
          <FileText className="h-6 w-6" />
          <span className="text-sm">PDF Document</span>
        </div>
      );
    }

    return (
      <div className="text-sm text-muted-foreground mb-4">
        Unsupported file format
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl">{resource.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderFilePreview()}
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {resource.description}
          </p>
          <div className="flex flex-col gap-3">
            {resource.links && resource.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {resource.links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Link {index + 1}
                  </a>
                ))}
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                By {resource.user.name}
              </span>
              {resource.category && (
                <span className="bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
                  {resource.category.name}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Explore;
