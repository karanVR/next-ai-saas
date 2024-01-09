import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image fill src="/logo.png" alt="loading" />
      </div>
      <p className="text-muted-foreground text-sm mt-4">
        api se answer generate ho rha h....wait..
      </p>
    </div>
  );
};

export default Loader;
