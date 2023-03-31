import { useField, useFormikContext } from "formik";
import "./Categories.css";

const categories = ["Backend", "Frontend", "Bug", "Test", "Support", "Other"];

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

    const colors = ["bg--firebrick", "bg--lightgray", "bg--lightgreen", "bg--cambridge", "bg--brightyellow" , "bg--caribbean"]

    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <div className="form-categories">
                {categories.map((category, index) => (
                    <button
                        className={"btn btn--bordered form-categories__btn bg--btn " + (field.value.indexOf(category) > -1 ? colors[index] : " ")}
                        key={category}
                        onClick={() => changeCategoryHandler(category)}
                        type="button"
                    >
                        {category}
                    </button>
                ))}
                {meta.touched && meta.error ? <div>{meta.error}</div> : null}
            </div>
        </div>
    );
};
