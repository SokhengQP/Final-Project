export const fallbackImg = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
export const url = `https://image.tmdb.org/t/p/original`;
export const faces = `https://image.tmdb.org/t/p/w220_and_h330_face/`;
export const faces_original = `https://image.tmdb.org/t/p/original`;
export const insta = `https://instagram.com/`;
export const fb = `https://facebook.com/`;
export const twit = `https://x.com/`;
export const tiktoks = `https://tiktok.com/@`;
export const yt = `https://youtube.com/`;

export var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export var monthFullName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


// Store multiple functions
export const innerDate = (monthNames) => {
    let fullMonth = new Date(monthNames);
    let releaseMonth = fullMonth.getMonth();
    let releaseDay = fullMonth.getDay();
    let releaseYear = fullMonth.getFullYear();
    return `${monthName[releaseMonth]} ${releaseDay < 9 ? "0" + releaseDay : releaseDay}, ${releaseYear}`;
}


export const convertBirthday = (birthDate) => {
    let bDates = new Date(birthDate);
    let bYears = bDates.getFullYear();
    let bMonths = bDates.getMonth();
    let bDays = bDates.getDate();
    return `${monthFullName[bMonths]} ${bDays < 9 ? '0' + bDays : bDays}, ${bYears}`;
}


export function convertCurrentYear(currentBirthYear) {
    let bDates = new Date(currentBirthYear);
    let bYears = bDates.getFullYear();
    const times = new Date().getFullYear();
    const currentYear = times - bYears;
    return currentYear;
}


export const convertRuntime = (runtimes) => {
    const hour = Math.floor(runtimes / 60);
    const remainMn = runtimes % 60;
    return `${hour}h ${remainMn < 9 ? '0' + remainMn : remainMn}m`;
}


export const convertDate = (convertDate) => {
    const fullDate = new Date(convertDate);
    const year = fullDate.getFullYear();
    return `${year}`;
}


// convert Vote_average to percentage
export function Votes(voteAverage) {
    const votes = Math.round(voteAverage * 10);
    return votes;
}


export function toggleFullRead(element) {
    if (element && element.classList) {
        element.classList.toggle("ellipsis-overview");
    }
}


export function convertGender(peops) {
    switch (peops) {
        case 1:
            return 'Female';
        case 2:
            return 'Male'
    }
}