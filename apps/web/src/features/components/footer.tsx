import { TH1, TSmall } from "@/components/ui/typo";

export function Footer() {
    return (
        <div className="w-full h-100 bg-black flex flex-col justify-between py-5">
          <div className="flex items-center gap-2">
            <div className="size-10 bg-white"></div>
            <TH1 className="text-white">Walker</TH1>
          </div>
          <div className="w-full flex justify-center">
            <TSmall className="text-white">MIT License @2025</TSmall>
          </div>
        </div>
    )
}