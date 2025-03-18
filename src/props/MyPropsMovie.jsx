import ProgressRounded from "../components/movies/details/ProgressRounded";
import { innerDate } from "../utility";
import { Blurhash } from "react-blurhash";
import { useState, useEffect } from "react";
const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;


export const MyPropsMovie = ({ poster, releaseDate, votes, originalTitle }) => {
    

    return (
        <div className="flex flex-col gap-4 overflow-clip rounded-xl group hover:scale-105 custom-drop-shadow">

            <img className="rounded-xl" src={poster} loading="lazy" alt={originalTitle} />

            <div className="flex justify-between px-4 py-2 relative">
                <aside className="text-nowrap text-clip px-2 ">
                    <div className=" text-[18px] font-[700] truncate">{originalTitle}</div>
                    <p className="text-[14px]">{releaseDate ? innerDate(releaseDate) : 'MM DD, YYYY'}</p>
                </aside>
                <aside className="absolute bottom-0 right-4 hover:scale-105">
                    <ProgressRounded value={votes} />
                </aside>
            </div>
        </div>
    )
}

