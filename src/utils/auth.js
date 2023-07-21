import moment from "moment";

export const isTokenExpired = () => {
  const expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
  return moment().isAfter(moment(expiresAt));
};
