const EMAIL_R_E =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const validateEmails = (emails) => {
  emails = emails.trim();
  if (emails[emails.length - 1] === ",") emails = emails.slice(0, -1);
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => EMAIL_R_E.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
  return;
};
