import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Resource {
  id: string;
  name: string;
  data: string;
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

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data.feed.map((r: Resource) => r.category?.name))
      ).filter(Boolean);

      setCategories(
        uniqueCategories.map((name) => ({
          name: name as string,
          resource: data.feed.filter((r: Resource) => r.category?.name === name),
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
    <>
    <Navbar/>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Explore Resources</h1>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search resources..."
            className="pl-10 w-full max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All Resources Tab */}
          <TabsContent value="all">
            {loading ? (
              <p>Loading resources...</p>
            ) : filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-8">
                No resources found
              </p>
            )}
          </TabsContent>

          {/* Category Tabs */}
          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              {category.resource.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-center text-gray-500 mt-8">
                  No resources found in this category
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

const ResourceCard = ({ resource }: { resource: Resource }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle className="text-xl">{resource.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{resource.data}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>By {resource.user.name}</span>
        {resource.category && (
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            {resource.category.name}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

export default Explore;
