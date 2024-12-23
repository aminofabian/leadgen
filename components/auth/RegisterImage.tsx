import Image from "next/image";

const RegisterImage = () => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-full h-full bg-gradient-to-bl from-black/40 via-[#a03494]/20 to-black/40 backdrop-blur-md rounded-r-xl p-8 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#f059da]/20 via-transparent to-[#a03494]/20 pointer-events-none" />
      
      <div className="relative w-full h-[500px]">
        <Image
          src="/register-image.jpg"
          alt="Register"
          fill
          className="object-contain rounded-lg shadow-lg"
          priority
        />
      </div>

    </div>
  );
};

export default RegisterImage;
