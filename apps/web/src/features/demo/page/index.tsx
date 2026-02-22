import { Button } from "@/components/ui/button";
import { TSmall } from "@/components/ui/typo";
import { Header } from "@/features/components/header";
import { RiHeart2Fill } from "@remixicon/react";
import React from "react";

function Row({ children } : { children : React.ReactNode}) {
    return (
        <div className="flex gap-10 w-full overflow-x-scroll">
            {children}
        </div>
    )
}

type CardProp = {
    title: string;
    price: number;
    url: string;
}

function Card({ title, price, url} : CardProp)  {
    return (
        <div className="flex flex-col gap-4 min-w-40 max-w-60 h-80 p-4 border-2 border-gray-50 shadow-sm rounded-2xl my-4">
            <img className="size-full" src={url}></img>
            <div className="flex justify-between items-center">
                <TSmall>{title}</TSmall>
                <Button>${price} <RiHeart2Fill size={16} className="text-red-500"/></Button>
            </div>
        </div>
    )
}

export function DemoPage() {
    return (
        <div className="w-screen h-screen p-0 m-0 flex flex-col items-center overflow-x-hidden">
            <Header />
            <div className="w-full h-40"></div>
            <Row>
                <Card url="https://github.com/shadcn.png" title="Title" price={2}/>
                <Card url="https://github.com/shadcn.png" title="Title" price={2}/>
                <Card url="https://github.com/shadcn.png" title="Title" price={2}/>
                <Card url="https://github.com/shadcn.png" title="Title" price={2}/>
                <Card url="https://github.com/shadcn.png" title="Title" price={2}/>
            </Row>
        </div>
    )
}