import { Button } from '@/components/ui/button';
import { TH4, TSmall } from '@/components/ui/typo';
import { Header } from '@/features/components/header';
import React, { useMemo } from 'react';
import {
  generateMockBook,
  generateMockCommerce,
  generateMockVehicle,
} from '../components/mock';

function Row({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) {
  return (
    <div className="w-full flex flex-col gap-8 mb-16">
      <TH4>{header}</TH4>
      <div className="flex gap-10 w-full overflow-x-scroll">{children}</div>
    </div>
  );
}

export type CardProp = {
  title: string;
  price: string;
  url: string;
};

function Card({ title, price, url }: CardProp) {
  return (
    <div className="flex flex-col gap-4 min-w-60 min-h-60 p-4 border-2 border-gray-50 shadow-sm rounded-2xl my-4 justify-between">
      <img className="w-full aspect-square" src={url}></img>
      <div className="flex justify-between items-center gap-4">
        <TSmall className='text-wrap'>{title}</TSmall>
        <Button>${price}</Button>
      </div>
    </div>
  );
}

export function DemoPage() {
  const commerce1 = useMemo(() => {
    return generateMockCommerce();
  }, []);
  const commerce2 = useMemo(() => {
    return generateMockCommerce();
  }, []);
  const commerce3 = useMemo(() => {
    return generateMockCommerce();
  }, []);
  const vehicle = useMemo(() => {
    return generateMockVehicle();
  }, []);
  const book = useMemo(() => {
    return generateMockBook();
  }, []);

  return (
    <div className="w-screen h-screen p-0 m-0 flex flex-col items-center">
      <Header />
      <div className="w-full flex flex-col p-30 overflow-y-scroll">
        <Row header="Walkers' favorite">
          {commerce1.map((item) => (
            <Card {...item} />
          ))}
        </Row>
        <Row header="Top seller">
          {commerce2.map((item) => (
            <Card {...item} />
          ))}
        </Row>
        <Row header="Trending">
          {commerce3.map((item) => (
            <Card {...item} />
          ))}
        </Row>
        <Row header="Books">
          {book.map((item) => (
            <Card {...item} />
          ))}
        </Row>
        <Row header="Vehicles">
          {vehicle.map((item) => (
            <Card {...item} />
          ))}
        </Row>
      </div>
    </div>
  );
}
