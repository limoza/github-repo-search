import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LOADING_ITEMS = 3;

export const SearchResultsLoading = () => {
  return (
    <ul>
      {Array.from({ length: LOADING_ITEMS }).map((_, index) => (
        <li key={index}>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};
