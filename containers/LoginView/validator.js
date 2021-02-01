import * as yup from "yup";

const schema = yup.object().shape({
  userName: yup.string().required("Required field"),
  password: yup.string().required("required field"),
});

async function validateInputs(data, locale) {
  let respond = {
    result: false,
    data: [],
  };
  await schema
    .validate(data, { abortEarly: false })
    .then((valid) => {
      respond.result = false;
    })
    .catch((err) => {
      respond.result = true;
      respond.data = err.inner.map((a) => {
        let b = {};
        b.name = a.path;
        b.message = a.errors[0];
        return b;
      });
    });
  return respond;
}
export function validate(data, locale) {
  let response = validateInputs(data, locale);
  return response;
}
