/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

interface FormikRatingProps {
  name: string;
  value: number;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const FormikRating: FC<FormikRatingProps> = ({
  name,
  value,
  setFieldValue,
}) => {
  return (
    <div>
      <Rating
        style={{ maxWidth: 300 }}
        value={value}
        onChange={(e: any) => setFieldValue(name, e)}
      />
    </div>
  );
};

export default FormikRating;
