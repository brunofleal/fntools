import moment from "moment";

interface OptionalParams {
    onlyDate?: boolean;
    onlyMonth?: boolean;
}
export const formatDateToLocalTime = (
    isoDate: string,
    { onlyDate = false }: OptionalParams
) => {
    const date = new Date(isoDate);
    if (onlyDate) {
        return date.toLocaleString("pt-Br", {
            dateStyle: "short",
        });
    }
    return date.toLocaleString("pt-Br", {
        dateStyle: "short",
        timeStyle: "short",
    });
};

export const getCurrentMonthRange = () => {
    moment.locale("pt-Br");
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");
    return [startOfMonth, endOfMonth];
};

export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
