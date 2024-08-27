declare module "react-rating" {
  import * as React from "react";

  export interface RatingProps {
    readonly?: boolean;
    placeholderRating?: number;
    start?: number;
    stop?: number;
    step?: number;
    fractions?: number;
    initialRating?: number;
    placeholderSymbol?: React.ReactNode;
    emptySymbol?: React.ReactNode;
    fullSymbol?: React.ReactNode;
    onClick?: (rate: number) => void;
    onHover?: (rate: number) => void;
    className?: string; // Adding className as well
  }

  const Rating: React.FC<RatingProps>;

  export default Rating;
}
