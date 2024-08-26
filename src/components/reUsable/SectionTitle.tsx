import React from "react";

type SectionTitleProps = {
  title: string;
  subTitle?: string;
  direction?: "start" | "center" | "end";
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subTitle,
  direction = "center",
}) => {
  return (
    <div className={`flex flex-col items-${direction} justify-center mb-10`}>
      <h2 className="text-3xl font-semibold text-primary">{title}</h2>
      {subTitle && <h3 className="text-xl font-medium mt-2">{subTitle}</h3>}
    </div>
  );
};

export default SectionTitle;
