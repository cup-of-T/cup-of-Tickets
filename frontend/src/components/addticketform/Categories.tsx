import { useField, useFormikContext } from "formik";
import "./Categories.css";

const categories = ["Backend", "Frontend", "Bug", "Tests", "Support", "Other"];

type CategoriesProps = {
  label: string;
};

export const Categories = ({ label }: CategoriesProps) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("categoryNames");

  const changeCategoryHandler = (value: string) => {
    const indexOfCategory = field.value.indexOf(value);
    if (indexOfCategory > -1) {
      setFieldValue(
        "categoryNames",
        field.value.filter(
          (category: string) => category != field.value[indexOfCategory]
        )
      );
    } else {
      setFieldValue("categoryNames", [...field.value, value]);
    }
  };

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <div className="categories">
        {categories.map((category) => (
          <button
            className="btn btn--bordered"
            key={category}
            onClick={() => changeCategoryHandler(category)}
            type="button"
          >
            {category}
          </button>
        ))}
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      </div>
    </>
  );
};
