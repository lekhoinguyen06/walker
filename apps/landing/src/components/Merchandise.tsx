import { ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';

export default function Merchandise({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <Card className="w-60 shrink-0 h-full flex flex-col p-3 gap-3 rounded-[12px] shadow-sm">
      <CardTitle className="font-brand">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardContent className="size-full flex flex-col justify-between items-end gap-3 p-0">
        <img
          src={image}
          alt={title}
          className="object-cover rounded-[12px] aspect-square mt-12"
        />
        <Button variant="default" size="icon-lg" className="rounded-none">
          <ShoppingBag />
        </Button>
      </CardContent>
    </Card>
  );
}
