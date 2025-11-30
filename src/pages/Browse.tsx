import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import ItemCard from '@/components/ItemCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Item {
  id: string;
  type: 'lost' | 'found';
  item_name: string;
  description: string;
  location: string;
  date: string;
  status: string;
  image_url: string | null;
  profiles: {
    full_name: string;
    email: string;
  };
}

const Browse = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        
        .order('created_at', { ascending: false });

      if (error) throw error;

      setItems((data as any as Item[]) || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openItems = filteredItems.filter((item) => item.status === 'open');
  const resolvedItems = filteredItems.filter((item) => item.status === 'resolved');
  const lostItems = filteredItems.filter((item) => item.type === 'lost');
  const foundItems = filteredItems.filter((item) => item.type === 'found');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Browse Items
            </h1>
            <p className="text-muted-foreground mb-6">
              Search through lost and found items on campus
            </p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by item name, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading items...</p>
            </div>
          ) : (
            <Tabs defaultValue="open" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
                <TabsTrigger value="open">Open ({openItems.length})</TabsTrigger>
                <TabsTrigger value="lost">Lost ({lostItems.length})</TabsTrigger>
                <TabsTrigger value="found">Found ({foundItems.length})</TabsTrigger>
                <TabsTrigger value="resolved">Resolved ({resolvedItems.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="open" className="mt-6">
                {openItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No open items found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {openItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="lost" className="mt-6">
                {lostItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No lost items found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lostItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="found" className="mt-6">
                {foundItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No found items</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {foundItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resolved" className="mt-6">
                {resolvedItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No resolved items</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resolvedItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
