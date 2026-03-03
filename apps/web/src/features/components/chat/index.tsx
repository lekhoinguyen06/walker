import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TPara } from "@/components/ui/typo";
import { RiCloseLine, RiSendInsLine } from "@remixicon/react";

type MessageProp = {
    content: string;
    sender: "human" | "ai";
}

function IncomingMessage({ text } : { text: string }) {
    return <TPara className="w-fit mr-16 bg-white/20 px-4 py-1 rounded-2xl rounded-bl-sm shadow-sm">{text}</TPara>
}

function SenderMessage({ text } : { text: string }) {
    return <TPara className="w-fit ml-auto bg-black text-white px-4 py-1 rounded-2xl rounded-br-sm shadow-sm">{text}</TPara>
}

export function Chat({ open } : { open: boolean }) {
    let messages: MessageProp[] = [
        { content: "Hello, how can I help you today?", sender: "ai" },
        { content: "Can you explain useMemo vs useEffect?", sender: "human" },
        { content: "Of course. useMemo memoizes values, useEffect handles side effects. Of course. useMemo memoizes values, useEffect handles side effects", sender: "ai" },
        { content: "Of course. useMemo memoizes values, useEffect handles side effects.", sender: "ai" },
        { content: "Of course. useMemo memoizes values, useEffect handles side effects.", sender: "ai" },
        { content: "So mock data shouldn't use useEffect?", sender: "human" },
        { content: "Correct. Only useEffect if you're simulating async behavior.", sender: "ai" },
        { content: "That makes sense.", sender: "human" },
        { content: "Anything else you'd like to improve?", sender: "ai" },
        { content: "Hello, how can I help you today?", sender: "ai" },
        { content: "Can you explain useMemo vs useEffect?", sender: "human" },
        { content: "Of course. useMemo memoizes values, useEffect handles side effects.", sender: "ai" },
        { content: "Of course. useMemo memoizes values, useEffect handles side effects.", sender: "ai" },
        { content: "Of course. useMemo memoizes values, useEffect handles side effects.", sender: "ai" },
        { content: "So mock data shouldn't use useEffect?", sender: "human" },
        { content: "Correct. Only useEffect if you're simulating async behavior.", sender: "ai" },
        { content: "That makes sense.", sender: "human" },
        { content: "Anything else you'd like to improve?", sender: "ai" },
    ];

    if (open) return (
        <div className='fixed top-0 right-0 h-full w-full min-w-80 max-w-120 flex flex-col bg-white/50 backdrop-blur-2xl z-50'>
            <div className="w-full flex justify-end">
                <Button className="aspect-square rounded-full p-4 m-4 shadow-none group hover:shadow-sm bg-transparent hover:bg-white/20" size="icon">
                    <RiCloseLine className="text-black" />
                </Button>
            </div>
            <div className='flex-1 overflow-y-scroll justify-end p-8'>
                {messages.map((m) => {
                    if (m.sender == 'ai') return <IncomingMessage text={m.content} />
                    if (m.sender == 'human') return <SenderMessage text={m.content} />
                    return;
                })}
            </div>
            <div className='flex gap-2 bg-white rounded-full border border-slate-100 m-8 p-2 shadow-sm'>
                <div className="w-full overflow-y-scroll">
                    <Input className='border-none shadow-none ring-0 focus:ring-0 focus-visible:ring-0' maxLength={100}/>
                </div>
                <Button className="bg-black aspect-square rounded-full" size="icon">
                    <RiSendInsLine className="text-white" />
                </Button>
            </div>
        </div>
    )
    return;
}