import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, PlusCircle, CheckCircle2, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Campus Lost & Found
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Reunite with your lost belongings or help others find theirs. Our platform makes it easy to report and discover lost items on campus.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <>
                    <Button asChild size="lg">
                      <Link to="/post">
                        <PlusCircle className="h-5 w-5 mr-2" />
                        Post an Item
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/browse">Browse Items</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild size="lg">
                      <Link to="/auth">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/browse">Browse Items</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImage}
                alt="Campus bulletin board with lost and found items"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Browse Items</CardTitle>
                  <CardDescription>
                    Search through lost and found items posted by students across campus
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <PlusCircle className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Post Items</CardTitle>
                  <CardDescription>
                    Report lost items or post found items to help reunite them with their owners
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Get Reunited</CardTitle>
                  <CardDescription>
                    Connect with item owners and mark items as resolved when returned
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold mb-4">
                Join Our Campus Community
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Sign up with your college email to start posting and managing lost & found items
              </p>
              <Button asChild size="lg">
                <Link to="/auth">Create Account</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
