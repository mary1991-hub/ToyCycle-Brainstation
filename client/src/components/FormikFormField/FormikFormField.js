import { useField } from "formik";
import {
  Textarea,
  FilePicker,
  FormField,
  TextInput,
  Alert,
} from "evergreen-ui";

const FormikFormField = ({ name, type, label, component, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const Component = component;
  return (
    <FormField label={label}>
      {type === "textarea" ? (
        <Textarea
          name={name}
          onChange={field.onChange}
          value={field.value}
          type={type}
          {...props}
        />
      ) : type === "image" ? (
        <FilePicker
          name={name}
          onChange={(file) => {
            helpers.setValue(file[0]);
          }}
          {...props}
          value={field.value}
        />
      ) : Component ? (
        <Component onChange={helpers.setValue} value={field.value} {...props} />
      ) : (
        <TextInput
          name={name}
          onChange={field.onChange}
          value={field.value}
          {...props}
          type={type}
        />
      )}
      {meta.error ? <Alert intent="danger" title={meta.error} /> : null}
    </FormField>
  );
};

export default FormikFormField;
