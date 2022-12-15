
export const addHours =(date: Date, hours: number): Date => {
    const newDate = new Date(date);
    newDate.setHours(date.getHours() + hours);

    return newDate;
}

export const formatTimeStamp = (unix_timestamp: number): string =>{

    const date = new Date(unix_timestamp * 1000);
    const dateString = date.toDateString();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();

    return hours + ':' + minutes.substr(-2) +"("+dateString+")";

}