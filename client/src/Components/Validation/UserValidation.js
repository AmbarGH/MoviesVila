import * as yup from "yup";

const emailValidation = yup
  .string()
  .trim()
  .required("Email is required")
  .strict(true)
  .lowercase("Email must be in lowercase")
  .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|in|org)$/, "Invalid email format");

const passwordValidation = yup
  .string()
  .required("No password provided.")
  .min(8, "Password is too short - should be 8 chars minimum.")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
  )
  .notOneOf(
    ["password", "123456", "qwerty"], // List of common words or passwords to avoid
    "Avoid using common words or passwords."
  )
  .matches(
    /^(?!.*(123|abc|xyz|987|789))([A-Za-z\d@$!%*?&]+)$/,
    "Password must not contain sequential characters."
  )
  .matches(
    /^(?!.*(.)\1{1,})[A-Za-z\d@$!%*?&]+$/,
    "Password must not contain repeated characters."
  );

const fullNameValidation = yup
  .string()
  .required("Full name is required.")
  .matches(/^[A-Za-z\s]+$/, "Special characters are not allowed in full name.")
  .test(
    "minWords",
    "Full name should contain at least two words.",
    (value) => {
      const words = value.split(" ").filter(Boolean);
      return words.length >= 2;
    }
  );

const LoginValidation = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

const RegisterValidation = yup.object().shape({
  fullName: fullNameValidation,
  email: emailValidation,
  password: passwordValidation,
});

const ProfileValidation = yup.object().shape({
  fullName: fullNameValidation,
  email: emailValidation,
});

const PasswordValidation = yup.object().shape({
  oldPassword: passwordValidation,
  newPassword: passwordValidation,
  confirmPassword: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .notOneOf(
      ["password", "123456", "qwerty"],
      "Avoid using common words or passwords."
    )
    .matches(
      /^(?!.*(123|abc|xyz|987|789))([A-Za-z\d@$!%*?&]+)$/,
      "Password must not contain sequential characters."
    )
    .matches(
      /^(?!.*(.)\1{1,})[A-Za-z\d@$!%*?&]+$/,
      "Password must not contain repeated characters."
    )
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export {
  LoginValidation,
  RegisterValidation,
  ProfileValidation,
  PasswordValidation,
};
