import { useDispatch, useSelector } from "react-redux"
import { fetchDiscoverByGenre, fetchTopBilledCast, fetchMovieDetails } from "../../../features/movie-action/movieAction";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { faces_original, fallbackImg, convertDate } from "../../../utility";


export default function CastCrew() {
    const { id, page } = useParams();
    const dispatch = useDispatch();
    const { details, creditMovie } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(fetchDiscoverByGenre(page));
        dispatch(fetchTopBilledCast(id));
    }, []);

    useEffect(() => {
        dispatch(fetchMovieDetails(id))
    }, [creditMovie])

    const total_cast_crew = () => {
        const totalCast = creditMovie?.cast?.length;
        const totalCrew = creditMovie?.crew?.length;
        return totalCast + totalCrew;
    }

    const [isLoadedCast, setIsLoadedCast] = useState(8);
    let [isLoadedCrew, setIsLoadedCrew] = useState(8);

    const handleCast = () => {
        setIsLoadedCast(prev => prev + 8);
    }

    const handleCrew = () => {
        setIsLoadedCrew(prev => prev + 8);
    }

    return (
        <>
            <header className="flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4 mt-[120px] rounded-md overflow-clip px-8 md:px-16 py-4  dark:bg-[rgba(128,128,128,0.28)]">
                
                <div className="flex items-center gap-4 justify-between">
                    <div className="cursor-pointer">
                        <img className="w-[80px] rounded-md" src={faces_original + details?.poster_path} alt={faces_original + creditMovie?.backdrop_path} />
                    </div>

                    <div className="cursor-pointer">

                        <Link to={`/movie-details/${creditMovie?.id}`} className="text-xl md:text-2xl font-[700] flex items-center gap-2 hover:text-blue-500">
                            <span>{details?.title || 'N/A'}</span>
                            <span className="font-[600]">{details?.release_date ? convertDate(details?.release_date) : ''} </span>
                        </Link>
                        <Link className="flex group" to={`/movie-details/${creditMovie?.id}`}>
                            <IoIosArrowRoundBack size={'24px'} className="group-hover:-translate-x-1" />
                            <p className="group-hover:text-gray-400">Back to main</p>
                        </Link>

                    </div>
                </div>

                <div className="text-sm md:text-lg">
                    Total cast and crew: {total_cast_crew()}
                </div>

            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 px-8 md:px-16 py-4">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center flex-shrink-0 text-xl">
                        <span className="font-semibold">Cast</span>
                        <span className="text-gray-400">{creditMovie?.cast?.length}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {
                            creditMovie?.cast?.slice(0, isLoadedCast)?.map((math, index) => {
                                const { id, original_name, name, profile_path, character } = math;
                                return (
                                    <Link
                                        to={`/to-persons/${id}-${name?.replace(/\s/g, '-')}#cast`}
                                        key={index}
                                        className="border-4 flex w-full rounded-xl overflow-hidden custom-drop-shadow border-gray-600 cursor-pointer"
                                    >
                                        <img
                                            className="object-cover aspect-square w-[80px]"
                                            src={profile_path ? faces_original + profile_path : fallbackImg}
                                            alt={name}
                                        />
                                        <div className="flex flex-col justify-center items-start px-4">
                                            <p className="truncate text-[12px] md:text-[14px] xl:text-base hover:text-blue-500">{original_name ? original_name : ''}</p>
                                            <p className="truncate text-gray-400 text-[10px] md:text-[12px] xl:text-[14px]">{character ? character : ''}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <br />
                    <button onClick={handleCast}
                        className={`${isLoadedCast < creditMovie?.cast?.length ? handleCast : 'hidden'} bg-blue-500 rounded-xl py-4 w-full`}
                    >Load more</button>
                </div>

                <div className="flex flex-col gap-4 rounded-xl">
                    <div className="flex gap-2 items-center flex-shrink-0 text-xl">
                        <p className="font-semibold">Crew</p>
                        <p className="text-gray-400 ">{creditMovie?.crew?.length}</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {
                            creditMovie?.crew?.slice(0, isLoadedCrew)?.map((crews, index) => {
                                const { id, name, profile_path, job } = crews;
                                return (
                                    <Link
                                        to={`/to-persons/${id}-${name.replace(/\s+/g, '-')}#Cast`}
                                        key={index}
                                        className="border-4 flex w-full rounded-xl overflow-hidden custom-drop-shadow border-gray-600 cursor-pointer"
                                    >
                                        <img
                                            className="object-cover aspect-square w-[80px]"
                                            src={profile_path ? faces_original + profile_path : fallbackImg}
                                            alt={name}
                                        />
                                        <div className="flex flex-col justify-center items-start px-4">
                                            <p className="truncate text-[12px] md:text-[14px] xl:text-base hover:text-blue-500">{name ? name : ''}</p>
                                            <p className="truncate text-gray-400 text-[10px] md:text-[12px] xl:text-[14px]">{job ? job : ''}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                    <br />
                    <button onClick={handleCrew}
                        className={`${isLoadedCrew < creditMovie?.crew?.length ? handleCrew : 'hidden'} bg-blue-500 rounded-xl py-4 w-full`}
                    >Load more</button>

                </div>

            </div>
        </>
    )
}

