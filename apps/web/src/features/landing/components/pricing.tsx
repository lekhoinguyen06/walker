import { Button } from "@/components/ui/button";
import { TH4, TLarge, TList, TMuted, TPara, TSmall } from "@/components/ui/typo";

export function Pricing() {
    return (
        <div className="w-full sm:h-200 p-10 flex flex-col gap-20">
          <div>
            <TH4>Pricing</TH4>
            <TPara className="mt-2!">
              You can also host Walker yourself using the community client at
              @walker/client
            </TPara>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-10 justify-center">
            <div className="h-120 min-w-80 rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col gap-10 p-10 bg-white">
              <div className="w-full flex justify-between items-center">
                <TLarge>Free</TLarge>
                <span className="flex items-baseline">
                  <TLarge className="mr-2">$0</TLarge>
                  <TMuted>forever</TMuted>
                </span>
              </div>
              <TPara className="mt-0!">Start walking</TPara>
              <div className="w-full h-full overflow-x-scroll">
                <TList
                  list={[
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                  ]}
                />
              </div>
            </div>
            <div className="h-120 min-w-80 rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col gap-10 p-10 bg-white">
              <div className="w-full flex justify-between items-center">
                <TLarge>Paid</TLarge>
                <span className="flex items-baseline">
                  <TLarge className="mr-2">$1</TLarge>
                  <TMuted>per credit</TMuted>
                </span>
              </div>
              <TPara className="mt-0!">Walk the web</TPara>
              <div className="w-full h-full overflow-x-scroll">
                <TList
                  list={[
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                  ]}
                />
              </div>
            </div>
            <div className="h-120 min-w-80 rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col gap-10 p-10 bg-white">
              <div className="w-full flex justify-between items-center">
                <TLarge>Enterprise</TLarge>
                <Button>
                  <TSmall>Try</TSmall>
                  <TSmall className="text-red-500">Concierge</TSmall>
                </Button>
              </div>
              <TPara className="mt-0!">Walk the Earth</TPara>
              <div className="w-full h-full overflow-x-scroll">
                <TList
                  list={[
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
    )
}