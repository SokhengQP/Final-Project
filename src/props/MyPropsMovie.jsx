import { useState } from "react";
import ProgressRounded from "../components/movies/details/ProgressRounded";
import { innerDate } from "../utility";

export const MyPropsMovie = ({ poster, releaseDate, votes, originalTitle }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    return (
        <div className="relative flex flex-col gap-4 overflow-clip rounded-xl group hover:scale-105 custom-drop-shadow">
            <img
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsLoaded(true)}
                className={`rounded-md transition-all duration-300 ${!isLoaded ? 'blur-xl' : ''}`}
                src={poster} loading="lazy" alt={originalTitle}
                srcSet={`
                    ${poster}?w=250 250w,
                    ${poster}?w=400 400w,
                    ${poster}?w=550 550w
                `}
            />

            <div className="flex justify-between px-4 py-2 relative">
                <aside className="text-nowrap text-clip px-2 ">
                    <div className=" text-[18px] font-[700] truncate">{originalTitle}</div>
                    <p className="text-[14px]">{releaseDate ? innerDate(releaseDate) : 'MM DD, YYYY'}</p>
                </aside>
                <aside className="absolute bottom-14 right-4 hover:scale-105">
                    <ProgressRounded value={votes} />
                </aside>
            </div>
        </div>
    )
}

