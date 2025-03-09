// Store multiple functions
export const innerDate = (monthNames) => {
    let fullMonth = new Date(monthNames);
    let releaseMonth = fullMonth.getMonth();
    let releaseDay = fullMonth.getDay();
    let releaseYear = fullMonth.getFullYear();
    let mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${mon[releaseMonth]} ${releaseDay < 9 ? "0" + releaseDay : releaseDay}, ${releaseYear}`;
}

// Movie || TV Show duration (2h: 04m)
export const convertRuntime = (runtimes) => {
    const hour = Math.floor(runtimes / 60);
    const remainMn = runtimes % 60;
    return `${hour}h ${remainMn < 9 ? '0' + remainMn : remainMn}m`;
}


// const [first, setFirst] = useState();
export const convertDate = (convertDate) => {
    const fullDate = new Date(convertDate);
    const year = fullDate.getFullYear();
    return `${year}`;
}


// convert Vote_average to percentage
export function Votes(voteAverage) {
    const votes = Math.round(voteAverage * 10) ;
    return votes;

}