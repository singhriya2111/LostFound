import { format } from 'date-fns';
import { MapPin, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ItemCardProps {
  item: {
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
  };
  onClick?: () => void;
}

const ItemCard = ({ item, onClick }: ItemCardProps) => {
  const typeColor = item.type === 'lost' ? 'lost' : 'found';
  const typeBg = item.type === 'lost' ? 'bg-lost-light' : 'bg-found-light';
  const typeText = item.type === 'lost' ? 'text-lost' : 'text-found';

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {item.image_url && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={item.image_url}
            alt={item.item_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{item.item_name}</CardTitle>
          <Badge className={`${typeBg} ${typeText} border-0 capitalize`}>
            {item.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {item.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{format(new Date(item.date), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate text-xs sm:text-sm">{item.profiles.full_name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground gap-1">
            <span className="font-medium text-xs sm:text-sm">Contact:</span>
            <a 
              href={`mailto:${item.profiles.email}`} 
              className="text-primary hover:underline text-xs sm:text-sm break-all"
            >
              {item.profiles.email}
            </a>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {item.status === 'resolved' && (
          <Badge variant="secondary" className="text-xs">
            Resolved
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
