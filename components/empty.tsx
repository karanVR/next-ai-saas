import Image from "next/image";
import React from "react";

interface IEmptyProps {
  label: string;
}

const Empty = ({ label }: IEmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image fill alt="Empty Image" src="/empty.png" />
      </div>
      <p className="text-sm text-muted-foreground text-center">{label}</p>
    </div>
  );
};

export default Empty;
