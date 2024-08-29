import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetAllServicesQuery } from "@/redux/features/service";
import { Link } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import Input from "@/components/formik/Input";
import { Form, Formik, FormikProps } from "formik";
import Dropdown from "@/components/formik/Dropdown";
import {
  maxDurationOptions,
  minDurationOptions,
  sortOptions,
} from "@/utils/list.utils";
import { useState } from "react";
import { TService } from "@/types";

interface TSearchFormValues {
  keyword: string;
  sort: "asc" | "desc"; // Assuming sort can only be 'asc' or 'desc'
  minDuration: string;
  maxDuration: string;
}

const initialValues: TSearchFormValues = {
  keyword: "",
  sort: "asc",
  minDuration: "",
  maxDuration: "",
};

const Service = () => {
  const [searchValues, setSearchValues] = useState(initialValues);
  const { data, isLoading } = useGetAllServicesQuery(searchValues);
  console.log(data);

  const onSubmit = (values: TSearchFormValues) => {
    console.log(values);
    setSearchValues(values);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <SectionTitle
        title="What We Offer"
        subTitle="Delivering quality services across a wide range of specialties"
      />
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ setFieldValue }: FormikProps<TSearchFormValues>) => {
            return (
              <Form className="flex items-center gap-x-5 mb-10">
                <Dropdown
                  name="sort"
                  options={sortOptions}
                  setFieldValue={setFieldValue}
                  placeholder="Sort by price"
                  optionsLabel="Sort by price"
                  prefix="service-price"
                />
                <Dropdown
                  name="minDuration"
                  options={minDurationOptions}
                  setFieldValue={setFieldValue}
                  placeholder="Minimum duration"
                  optionsLabel="Minimum duration"
                  prefix=""
                />
                <Dropdown
                  name="maxDuration"
                  options={maxDurationOptions}
                  setFieldValue={setFieldValue}
                  placeholder="Maximum duration"
                  optionsLabel="Maximum duration"
                />
                <Input name="keyword" />
                <button className="h-[50px] w-[150px] bg-primary text-white font-semibold rounded-md">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {data?.data.map((item: TService) => {
          return (
            <div
              key={item?._id}
              className="bg-primary-foreground/5 p-5 rounded-md"
            >
              <h3 className="text-xl font-semibold mb-2">{item?.name}</h3>
              <p className="">{item?.description.slice(0, 50)}</p>
              <div className="flex gap-x-5 w-full mt-2">
                <p className="font-medium">Duration: {item?.duration}</p>
                <p className="font-medium flex items-center">
                  Price: {item?.price} <BsCurrencyDollar />{" "}
                </p>
              </div>
              <Link
                to={`/service-details/${item?._id}`}
                className="flex flex-row items-center text-primary-foreground font-semibold rounded w-[180px] mt-2"
              >
                Learn more <MdOutlineDoubleArrow className="mt-1 ms-1" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
