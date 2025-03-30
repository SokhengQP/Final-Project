import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import { fetchCreditTv, fetchTv } from "../../../features/movie-action/movieAction";
import { useEffect, useState } from "react";
import { convertDate, faces, fallbackImg } from "../../../utility";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function CastCrewTv() {
    const params = useParams();
    const dispatch = useDispatch();
    const { tvs, creditTv } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(fetchTv(params.id));
        dispatch(fetchCreditTv(params.id));
    }, [])

    const [isLoadedCast, setIsLoadedCast] = useState(8);
    const [isLoadedCrew, setIsLoadedCrew] = useState(8);
    const [isHoldImg, setIsHoldImg] = useState(false);

    const handleCast = () => {
        setIsLoadedCast(prev => prev + 8);
    }

    const handleCrew = () => {
        setIsLoadedCrew(prev => prev + 8);
    }

    return (
        <>
            <header className="flex gap-4 items-center mt-[120px] rounded-md overflow-clip px-8 md:px-16 py-4 shadow-[0_0_4px_gray] dark:bg-[rgba(128,128,128,0.28)]">
                <div className="cursor-pointer">
                    <img
                        onLoad={() => setIsHoldImg(true)}
                        onError={() => setIsHoldImg(true)}
                        className={`${!isHoldImg ? 'blur-xl' : ''} w-32 h-32 object-contain border rounded-xl`}
                        src={tvs?.poster_path ? faces + tvs?.poster_path : fallbackImg}
                        alt={faces + tvs?.backdrop_path}
                    />

                </div>

                <div className="cursor-pointer">
                    <Link to={`/tv-details/${tvs?.id}`} className="text-xl md:text-2xl font-[700] flex items-center gap-2 hover:text-blue-500">
                        <span>{tvs?.name || ''}</span>
                        <span className="font-[600]">{tvs?.first_air_date ? convertDate(tvs?.first_air_date) : ''}</span>
                    </Link>

                    <Link className="flex group" to={`/tv-details/${creditTv?.id}`}>
                        <IoIosArrowRoundBack size={'24px'} className="group-hover:-translate-x-1 " />
                        <p className="group-hover:text-gray-400">Back to main</p>
                    </Link>

                </div>
            </header>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8 md:px-16 py-4">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center flex-shrink-0 text-xl">
                        <p className="font-semibold">Cast</p>
                        <p className="text-gray-400 ">{creditTv?.cast?.length}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center gap-8">
                        {
                            creditTv?.cast?.slice(0, isLoadedCast)?.map((math) => {
                                const { id, name, profile_path, total_episode_count, roles } = math;
                                return (
                                    <Link
                                        to={`/to-persons/${id}-${name.replace(/\s/g, ('-'))}`}
                                        key={name}
                                        className={`flex rounded-xl overflow-hidden border-2 border-gray-600 cursor-pointer`}
                                    >
                                        <img
                                            onError={() => setIsHoldImg(true)}
                                            onLoad={() => setIsHoldImg(true)}
                                            className={`${!isHoldImg ? 'blur-xl' : ''} object-cover aspect-square w-[80px]`}
                                            src={profile_path ? faces + profile_path : fallbackImg}
                                            alt={name}
                                        />
                                        <div className="flex flex-col justify-center items-start px-4">
                                            <p className="truncate text-[12px] md:text-[14px] xl:text-base hover:text-blue-500">{name ? name : ''}</p>
                                            <p className="text-[14px] brightness-90 ">{roles?.map(cha => cha.character) ?? "??"} <span className="text-gray-300 text-[14px]">({total_episode_count ? total_episode_count + ' Episodes' : 'N/A'})</span></p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <br />
                    <button onClick={handleCast}
                        className={`${isLoadedCast < creditTv?.cast?.length ? handleCast : 'hidden'} bg-blue-500 rounded-xl py-4 w-full`}
                    >Load more</button>
                </div>



                <div className="flex flex-col gap-4 ">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center flex-shrink-0 text-xl">
                            <p className="font-semibold">Series Crew</p>
                            <p className="text-gray-400 ">{creditTv?.crew?.length}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center gap-8">
                            {
                                creditTv?.crew?.slice(0, isLoadedCrew)?.map(crews => {
                                    const { id, name, profile_path, jobs, total_episode_count } = crews;
                                    return (
                                        <Link
                                            to={`/to-persons/${id}-${name?.replace(/\s/g, ('-'))}`}
                                            key={name}
                                            className="flex gap-6 rounded-xl overflow-hidden border-2 border-gray-600 cursor-pointer"
                                        >
                                            <img
                                                onError={() => setIsHoldImg(true)}
                                                onLoad={() => setIsHoldImg(true)}
                                                className={`object-cover aspect-square w-[80px] ${!isHoldImg ? 'blur-xl' : ''}`}
                                                src={profile_path ? faces + profile_path : fallbackImg}
                                                alt={name}
                                            />
                                            <div className="flex flex-col justify-center items-start">
                                                <p className="truncate text-[12px] md:text-[14px] xl:text-base hover:text-blue-500">{name ? name : ''}</p>
                                                <p className="text-[14px] brightness-90">{jobs?.map(cha => cha.job)} <span className="text-gray-100 text-[14px]">({total_episode_count ? total_episode_count + ' Episodes' : 'N/A'})</span></p>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <br />
                        <button onClick={handleCrew}
                            className={`${isLoadedCrew < creditTv?.crew?.length ? handleCrew : 'hidden'} text-white bg-blue-500 rounded-xl py-4 w-full`}
                        >
                            Load more
                        </button>
                    </div>
                </div>

            </div>



        </>
    )
}