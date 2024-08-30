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
    <div
      className={`flex flex-col items-${direction} justify-center mb-10 mt-5`}
    >
      <h2 className="lg:text-3xl text-2xl font-semibold text-primary">
        {title}
      </h2>
      {subTitle && (
        <h3 className="lg:text-xl text-lg text-center font-medium mt-2">
          {subTitle}
        </h3>
      )}
    </div>
  );
};

export default SectionTitle;
