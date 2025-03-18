import { useDispatch, useSelector } from "react-redux"
import { fetchDiscoverByGenre, fetchTopBilledCast, fetchMovieDetails } from "../../../features/movie-action/movieAction";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { url, empty, convertDate } from "../../../utility";

export default function CastCrew() {
    const param = useParams();
    const dispatch = useDispatch();
    const { details, creditMovie } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(fetchDiscoverByGenre());
        dispatch(fetchTopBilledCast(param.id));
    }, []);

    useEffect(() => {
        dispatch(fetchMovieDetails(param.id))
    }, [creditMovie])

    return (
        <>
            <header className="flex gap-4 items-center mt-[120px] rounded-md overflow-clip px-10 py-4 shadow-[0_0_4px_gray] dark:bg-[rgba(128,128,128,0.28)]">
                <div className="cursor-pointer">
                    <img className="w-[80px] rounded-md" src={url + details?.poster_path} alt={url + creditMovie?.backdrop_path} />
                </div>
                <div className="cursor-pointer">
                    <Link to={`/movie-details/${creditMovie?.id}`} className="font-[700] text-5xl flex items-center gap-2 hover:text-blue-500">
                        <span>{details?.title || 'N/A'}</span>
                        <span className="font-[600]">{details?.release_date ? convertDate(details?.release_date) : ''} </span>
                    </Link>

                    <Link className="flex group" to={`/movie-details/${creditMovie?.id}`}>
                        <IoIosArrowRoundBack size={'24px'} className="group-hover:-translate-x-1 " />
                        <p className="group-hover:text-gray-400">Back to main</p>
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-20 mx-10 py-4">

                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center flex-shrink-0 text-xl">
                        <span className="font-semibold">Cast</span>
                        <span className="text-gray-400">{creditMovie?.cast?.length}</span>
                    </div>
                    <Link to={`/to-persons/${creditMovie?.id}-${creditMovie?.cast?.name?.replace(/\s/g, ('-'))}'#'Cast`} className="flex flex-col gap-6" key={creditMovie?.cast?.id}>
                        {
                            creditMovie?.cast?.map((math, index) => {
                                const { original_name, name, profile_path, character } = math;
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-6 rounded-xl shadow-[0_0_4px_gray] overflow-hidden transition-transform hover:scale-105 border-gray-700 cursor-pointer"
                                    >
                                        <img
                                            className="object-cover aspect-square w-[80px]"
                                            src={profile_path ? url + profile_path : empty}
                                            alt={name}
                                        />
                                        <div className="flex flex-col justify-center items-start">
                                            <p className="truncate text-[12px] md:text-[14px] xl:text-base hover:text-blue-500">{original_name ? original_name : ''}</p>
                                            <p className="truncate text-gray-400 text-[10px] md:text-[12px] xl:text-[14px]">{character ? character : ''}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Link>

                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center flex-shrink-0 text-xl">
                        <p className="font-semibold">Crew</p>
                        <p className="text-gray-400">{creditMovie?.crew?.length}</p>
                    </div>
                    <Link className="flex flex-col gap-6">
                        {
                            creditMovie?.crew?.map(crews => {
                                const { id, name, profile_path, job } = crews;
                                return (
                                    <Link
                                        to={`/to-persons/${id}-${name.replace(/\s+/g, '-')}'#'Cast`}
                                        key={id}
                                        className="flex gap-6 rounded-xl shadow-[0_0_4px_gray] overflow-hidden hover:scale-105 transition-transform border-gray-700 cursor-pointer"
                                    >
                                        <img
                                            className="object-cover aspect-square w-[80px]"
                                            src={profile_path ? url + profile_path : empty}
                                            alt={name}
                                        />
                                        <div className="flex flex-col justify-center items-start">
                                            <p className="truncate text-[12px] md:text-[14px] xl:text-base hover:text-blue-500">{name ? name : ''}</p>
                                            <p className="truncate text-gray-400 text-[10px] md:text-[12px] xl:text-[14px]">{job ? job : ''}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </Link>
                </div>

            </div>
        </>
    )
}

