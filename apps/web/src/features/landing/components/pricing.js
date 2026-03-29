import { Button } from '@/components/ui/button';
export function Pricing() {
    return (<div className="w-full sm:h-200 p-10 flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        <span className="text-title-h5">Pricing</span>
        <span className="block text-paragraph-lg">
          You can also host Walker yourself using the community client at
          @walker/client
        </span>
      </div>
      <div className="w-full flex flex-col sm:flex-row gap-10 justify-center">
        <div className="h-120 min-w-80 rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col gap-10 p-10 bg-white">
          <div className="w-full flex justify-between items-center">
            <span className="text-label-lg">Free</span>
            <span className="flex items-baseline">
              <span className="text-paragraph-lg mr-2">$0</span>
              <span className="text-paragraph-sm">forever</span>
            </span>
          </div>

          <div className="w-full h-full overflow-x-scroll"></div>
        </div>
        <div className="h-120 min-w-80 rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col gap-10 p-10 bg-white">
          <div className="w-full flex justify-between items-center">
            <span className="text-label-lg">Paid</span>
            <span className="flex items-baseline">
              <span className="text-paragraph-lg mr-2">$1</span>
              <span className="text-paragraph-sm">per credit</span>
            </span>
          </div>

          <div className="w-full h-full overflow-x-scroll"></div>
        </div>
        <div className="h-120 min-w-80 rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col gap-10 p-10 bg-white">
          <div className="w-full flex justify-between items-center">
            <span className="text-label-lg">Enterprise</span>
            <Button className="hover:bg-red-500">
              <span className="text-paragraph-sm">Try Concierge</span>
            </Button>
          </div>

          <div className="w-full h-full overflow-x-scroll"></div>
        </div>
      </div>
    </div>);
}
