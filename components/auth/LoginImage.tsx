import Image from "next/image";

const LoginImage = () => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-black/40 via-[#a03494]/20 to-black/40 backdrop-blur-md rounded-l-2xl relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/20 via-transparent to-[#a03494]/20 pointer-events-none animate-gradient" />
      
      {/* Glowing orb effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#f059da]/5 blur-3xl pointer-events-none" />
      
      <div className="relative w-full h-full">
        <Image
          src="/login-image.jpg"
          alt="Login"
          fill
          className="object-contain rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-500"
          priority
        />
      </div>
    </div>
  );
};

export default LoginImage;
