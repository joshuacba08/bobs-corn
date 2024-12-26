import dayjs from "dayjs";

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format("dddd, MMMM D, YYYY [at] h:mm A");
};
