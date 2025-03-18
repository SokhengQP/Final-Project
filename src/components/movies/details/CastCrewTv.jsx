import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import { fetchCreditTv, fetchTv } from "../../../features/movie-action/movieAction";
import { useEffect } from "react";
import { convertDate } from "../../../utility";
import { IoIosArrowRoundBack } from "react-icons/io";

const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;

export default function CastCrewTv() {
    const params = useParams();
    const dispatch = useDispatch();
    const { tvs, creditTv } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(fetchTv(params.ids));
        dispatch(fetchCreditTv(params.id));
    }, [])

    return (
        <>
            <header className="flex gap-4 items-center mt-[120px] rounded-md overflow-clip px-10 py-4 shadow-[0_0_4px_gray] dark:bg-[rgba(128,128,128,0.28)]">
                <div className="cursor-pointer">
                    <img className="w-[80px] rounded-md" src={tvs?.poster_path ? url + tvs?.poster_path : empty} alt={url + tvs?.backdrop_path} />
                </div>

                <div className="cursor-pointer">
                    {/* Link back to tv-details */}
                    <Link to={`/tv-details/${tvs?.id}`} className="font-[700] text-5xl flex items-center gap-2 hover:text-blue-500">
                        <span>{tvs?.name || ''}</span>
                        <span className="font-[600]">{tvs?.first_air_date ? convertDate(tvs?.first_air_date) : ''}</span>
                    </Link>

                    <Link className="flex group" to={`/tv-details/${creditTv?.id}`}>
                        <IoIosArrowRoundBack size={'24px'} className="group-hover:-translate-x-1 " />
                        <p className="group-hover:text-gray-400">Back to main</p>
                    </Link>
                    
                </div>
            </header>


            <div className="grid grid-cols-2 gap-20 mx-10  py-4">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center flex-shrink-0 text-xl">
                        <span className="font-semibold">Series Cast</span>
                        <span className="text-gray-400">{creditTv?.cast?.length}</span>
                    </div>
                    <div className="">
                    </div>
                    {
                        creditTv?.cast?.map((math) => {
                            const { id, name, profile_path, total_episode_count, roles } = math;
                            return (
                                <Link
                                    to={`/to-persons/${id}-${name.replace(/\s/g, ('-'))}`}
                                    key={name}
                                    className="flex gap-6 rounded-xl shadow-[0_0_4px_gray] overflow-hidden hover:scale-105 transition-transform border-gray-700 cursor-pointer"
                                >
                                    <img
                                        className="object-cover aspect-square w-[80px]"
                                        src={profile_path ? url + profile_path : empty}
                                        alt={name}
                                    />
                                    <div className="flex flex-col justify-center items-start">
                                        <p className="truncate text-[12px] md:text-[14px] xl:text-base hover:text-blue-500">{name ? name : ''}</p>
                                        <p className="text-[14px] brightness-90">{roles?.map(cha => cha.character) ?? "??"} <span className="text-gray-300 text-[14px]">({total_episode_count ? total_episode_count + ' Episodes' : 'N/A'})</span></p>
                                    </div>


                                </Link>
                            )
                        })
                    }
                </div>



                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center flex-shrink-0 text-xl">
                        <p className="font-semibold">Series Crew</p>
                        <p className="text-gray-400">{creditTv?.crew?.length}</p>
                    </div>
                    {

                        creditTv?.crew?.map(crews => {
                            const { id, name, profile_path, jobs, total_episode_count } = crews;
                            return (
                                <Link
                                    to={`/to-persons/${id}-${name?.replace(/\s/g, ('-'))}`}
                                    key={name}
                                    className="flex gap-6 rounded-xl shadow-[0_0_4px_gray] overflow-hidden hover:scale-105 transition-transform border-gray-700 cursor-pointer"
                                >
                                    <img
                                        className="object-cover aspect-square w-[80px]"
                                        src={profile_path ? url + profile_path : empty}
                                        alt={name}
                                    />
                                    <div className="flex flex-col justify-center items-start">
                                        <p className="truncate text-[12px] md:text-[14px] xl:text-base hover:text-blue-500">{name ? name : ''}</p>
                                        <p className="text-[14px] brightness-90">{jobs?.map(cha => cha.job)} <span className="text-gray-100 text-[14px]">({total_episode_count ? total_episode_count + ' Episodes' : 'N/A'})</span></p>
                                    </div>
                                </Link>
                            )
                        }) || 'Hi'
                    }
                </div>
            </div>
        </>
    )
}