export function Footer() {
  return (
    <div className="w-full h-100 bg-black flex flex-col justify-between py-5">
      <div className="flex items-center gap-2">
        <img src="/dark.svg" alt="Logo" className="h-10 object-cover" />
      </div>
      <div className="w-full flex justify-center">
        <span className="text-label-lg text-white">MIT License @2025</span>
      </div>
    </div>
  );
}
