import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { fetchTv, fetchCreditTv } from "../../features/movie-action/movieAction";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";
import { innerDate, convertRuntime, Votes } from '../../utility.js';
import ProgressRounded from "./details/ProgressRounded.jsx";
import { GrOverview } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;

export default function TvDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const { tvs, creditTv } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(fetchTv(params.id));
        dispatch(fetchCreditTv(params.id));
    }, [])


    const { poster_path, original_name, name, overview, vote_average, first_air_date, genres, episode_run_time, backdrop_path } = tvs;

    return (
        <>
            <div className="mb-20">
                <div className="flex h-screen justify-center gap-40 rounded-3xl items-center relative flex-shrink-0 overflow-clip py-4">

                    <div className="z-10 relative group cursor-pointer w-[340px]">
                        <img className="object-contain rounded-xl" src={poster_path ? url + poster_path : empty} alt={original_name ? original_name : "Unavailable"} />
                    </div>

                    <div className="z-10 flex flex-col gap-8 hover:backdrop-blur-[20px] p-4 hover:bg-[#80808084] rounded-xl">

                        <section className="flex flex-col justify-center gap-2">
                            <section className="flex gap-4 items-center justify-start">
                                <span className="font-[800] text-[2.2rem] hover:text-[gray] ">{name || 'Loading...'} </span>
                                <ProgressRounded value={Votes(vote_average) || "0"} />
                            </section>

                            <section className="flex gap-4 ">
                                <aside className="rounded-sm flex gap-1 items-center justify-center">
                                    <MdDateRange size='24px' />
                                    <section>{first_air_date ? innerDate(first_air_date) : 'MM DD, YYYY'}</section>
                                </aside> &nbsp;

                                <aside className="flex items-center gap-1">
                                    {
                                        genres?.map((item) => {
                                            const { name, id } = item;
                                            return (
                                                <Link key={id} to={`/genre/${id}-${name}/tv`} className="text-nowrap bg-[#80808084] hover:bg-[gray] px-4 py-1 rounded-3xl">{name}</Link>
                                            )
                                        }) || "Not Found"
                                    }
                                </aside>

                                <aside className="flex gap-1 items-center">
                                    <IoMdTime size='24px' />
                                    <span className="">{convertRuntime(episode_run_time) || ''}</span>
                                </aside>

                            </section>

                        </section>

                        <section className="flex gap-2 flex-col ">

                            <aside className="flex items-center gap-2">
                                <GrOverview size='24px' />
                                <h3 className="text-[20px] font-[700]">Overview</h3>
                            </aside>

                            <p className="text-ellipsis w-[600px]">{overview}</p>
                        </section>

                        <Link to={`/video-type/${tvs.id}-tvs`} className="flex bg-[rgba(255,0,0,0.50)] hover:bg-[rgba(255,0,0,0.80)] px-4 py-2 rounded-3xl w-fit gap-2 items-center flex-shrink-0">
                            <FaPlay className="cursor-pointer" size='24px' />
                            <button>Play Trailer</button>
                        </Link>
                    </div>

                </div>

                <div className="absolute top-0 brightness-50 opacity-25 ">
                    <img className="object-contain" src={backdrop_path ? url + backdrop_path : empty} alt={name || 'Unavailable'} />
                </div>

            </div>


            <p className="rounded-md px-2 py-1 mx-10 text-3xl mt-36">Series Cast</p>
            <div
                className="flex items-center gap-4 mx-10 py-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                role="region"
                aria-label="Cast members list"
            >
                {
                    creditTv?.cast && creditTv?.cast?.length > 0 ? (
                        creditTv?.cast?.map((castMember) => {
                            const { id, profile_path, original_name, name, character } = castMember;
                            return (
                                <div
                                    key={id || name} // Prefer id if available, fallback to name
                                    className="flex flex-col flex-shrink-0 items-center w-[140px] 2xl:w-[200px] bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform border border-gray-700 cursor-pointer"
                                >
                                    <img
                                        className="w-full h-[200px] md:h-[260px] object-cover"
                                        src={profile_path ? `${url}${profile_path}` : empty}
                                        alt={`${name} as ${character}`}
                                        loading="lazy" // Optimize image loading
                                        onError={(e) => (e.target.src = empty)} // Fallback if image fails
                                    />
                                    <div className="text-white font-semibold py-2 px-4 w-full bg-gray-900">
                                        <p className="truncate text-[12px] md:text-[14px] xl:text-base hover:text-blue-500">
                                            {name}
                                        </p>
                                        <p className="truncate text-gray-400 text-[10px] md:text-[12px] xl:text-[14px]">
                                            {character}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-gray-400 text-start w-full px-2">We don&apos;t have any cast information available.</p>
                    )}
            </div>

            <div className="mx-10 my-4 w-fit rounded-md px-2 py-1 hover:text-blue-500 cursor-pointer">
                <Link to={`/tv/${tvs.id}/cast&crew`}>Full Cast & Crew</Link>
            </div>

        </>
    )
}

