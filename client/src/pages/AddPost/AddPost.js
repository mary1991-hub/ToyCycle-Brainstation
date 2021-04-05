import { Form, Formik, useFormikContext, useField } from "formik";
import {
  Button,
  Heading,
  Textarea,
  FilePicker,
  FormField,
  TextInput,
  Alert,
} from "evergreen-ui";
import axios from "axios";
import { getToken } from "../../utils/auth";
import React from "react";
import { Redirect } from "react-router";

const createPost = (values) => {
  console.log(values);
  const data = new FormData();
  for (let key in values) {
    data.append(key, values[key]);
  }

  return axios({
    url: "http://localhost:8080/posts/",
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};

const validate = (values) => {
  const errors = {};
  let count = 0;
  if (!values.name) {
    errors["name"] = "name field is required";
    count += 1;
  }
  if (!values.images) {
    errors["images"] = "images field is required";
    count += 1;
  }
  if (count > 0) {
    return errors;
  } else {
    return null;
  }
};

const FormikFormField = ({ name, type, label }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormField label={label}>
      {type === "textarea" ? (
        <Textarea
          name={name}
          onChange={field.onChange}
          value={field.value}
          type={type}
        />
      ) : type === "image" ? (
        <FilePicker
          name={name}
          onChange={(file) => {
            helpers.setValue(file[0]);
          }}
          value={field.value}
        />
      ) : (
        <TextInput
          name={name}
          onChange={field.onChange}
          value={field.value}
          type={type}
        />
      )}
      {meta.error ? <Alert intent="danger" title={meta.error} /> : null}
    </FormField>
  );
};

const PostForm = () => {
  const { values, submitForm } = useFormikContext();
  return (
    <Form>
      <Heading size={700}>Add posting</Heading>
      <pre>{JSON.stringify(values)}</pre>
      <FormikFormField name={"name"} label={"Name:"} />
      <FormikFormField
        name={"description"}
        type={"textarea"}
        label={"Description:"}
      />
      <FormikFormField
        name={"tradeCondition"}
        type={"textarea"}
        label={"I want to exchange for:"}
      />
      <FormikFormField name={"images"} type={"image"} label={"Image:"} />
      <Button type={"button"} onClick={submitForm}>
        Save
      </Button>
    </Form>
  );
};

const AddPost = () => {
  const [created, setCreated] = React.useState(null);
  return created ? (
    <Redirect to={`/posts/${created.id}`} />
  ) : (
    <Formik
      initialValues={{}}
      validate={validate}
      onSubmit={(values, actions) => {
        createPost(values)
          .then((result) => {
            actions.setStatus(null);
            setCreated(result.data);
          })
          .catch((error) => {
            actions.setStatus({ error });
          });
      }}
    >
      <PostForm />
    </Formik>
  );
};

export default AddPost;
