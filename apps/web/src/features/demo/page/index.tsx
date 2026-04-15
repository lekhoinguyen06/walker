import { Header } from '@/features/components/header';
import { useMemo, useState } from 'react';
import {
  generateMockBook,
  generateMockCommerce,
  generateMockVehicle,
} from '../components/mock';
import { BaseItem } from '@repo/react';
import { Chat } from '@/features/components/chat';
import Trigger from '@/features/components/chat/trigger';
import { Row } from '../components/row';
import { Card } from '../components/card';
import { Cart } from '../components/cart';
import { Button } from '@/components/ui/button';
import { RiShoppingBasket2Line } from '@remixicon/react';

export function DemoPage() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
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
    <BaseItem itemKey="demo-page">
      <div className="w-screen h-screen p-0 m-0 flex flex-col items-center">
        <Header />
        <Chat open={open} setOpen={setOpen} />
        <Trigger setOpen={setOpen} />
        <Cart open={cartOpen} setOpen={setCartOpen}>
          <Button variant="outline" className='z-50 fixed bottom-0 right-0 mr-24 mb-8 bg-black shadow-sm size-12 ring-2 ring-white aspect-square rounded-none group hover:bg-white hover:ring-black'>
            <RiShoppingBasket2Line className='text-white group-hover:text-black' />
          </Button>
        </Cart>
        <div className="w-full flex flex-col p-30">
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
    </BaseItem>
  );
}
