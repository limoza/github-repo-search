import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LOADING_ITEMS = 4;

export const SearchResultsLoading = () => (
  <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-3">
    {Array.from({ length: LOADING_ITEMS }).map((_, index) => (
      <li key={index}>
        <Card className="flex h-full flex-col">
          <CardHeader className="space-y-3">
            <CardTitle>
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-5 w-56" />
              </div>
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-full" />
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-auto">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>
        </Card>
      </li>
    ))}
  </ul>
);
