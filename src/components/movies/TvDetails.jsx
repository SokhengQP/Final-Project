import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchTv, fetchCreditTv } from "../../features/movie-action/movieAction";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";
import { innerDate, Votes } from '../../utility.js';
import ProgressRounded from "./details/ProgressRounded.jsx";
import { GrOverview } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";

const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;

export default function TvDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const { tvs, creditTv } = useSelector((state) => state.movie);

    useEffect(() => {
        document.title = 'TV Details'; // Added to match MovieDetails
        dispatch(fetchTv(params.id));
        dispatch(fetchCreditTv(params.id));
    }, [dispatch, params.id]); // Added dependencies to match MovieDetails

    const { poster_path, original_name, name, overview, vote_average, first_air_date, genres, backdrop_path, id } = tvs;

    return (
        <>
            <div className="mb-20 relative">
                <div className="flex h-screen justify-center gap-40 rounded-3xl items-center relative flex-shrink-0 overflow-clip py-4">
                    <div className="z-10 relative group cursor-pointer w-[340px]">
                        <img className="object-contain rounded-xl" src={poster_path ? url + poster_path : empty} alt={original_name ? original_name : "Unavailable"} />
                    </div>

                    <div className=" z-10 flex flex-col gap-8 hover:backdrop-blur-[20px] p-4 hover:bg-[#80808084] rounded-xl">
                        <section className="cursor-pointer flex flex-col justify-center gap-2">
                            <section className="flex gap-4 items-center justify-start">
                                <span className="font-[800] text-[2.2rem] custom-drop-shadow">{name || 'Loading...'}</span>
                                <ProgressRounded value={Votes(vote_average) || "0"} />
                            </section>

                            <section className="flex gap-4">
                                <aside className="rounded-sm flex gap-1 items-center justify-center">
                                    <MdDateRange size='24px' />
                                    <section>{first_air_date ? innerDate(first_air_date) : 'MM DD, YYYY'}</section>
                                </aside>

                                <aside className="flex items-center gap-1">
                                    {genres?.map((item) => {
                                        return (
                                            <Link key={item?.id} to={`/genre/${item.id}-${item.name?.replace(/\s+/g, '-')}/tv`} className="text-nowrap bg-[#80808084] hover:bg-[gray] px-4 py-1 rounded-3xl">{item.name}</Link>
                                        );
                                    }) || "Not Found"}
                                </aside>
                            </section>
                        </section>

                        <section className="flex gap-2 flex-col cursor-pointer">
                            <aside className="flex items-center gap-2">
                                <GrOverview size='24px' />
                                <h3 className="text-[20px] font-[700] ">Overview</h3>
                            </aside>
                            <p className="text-ellipsis w-[600px] h-[100px] overflow-y-auto">{overview || "We don't have an overview translated in English."}</p>
                        </section>

                        <Link to={`/vdoTv/${tvs?.id}-${tvs?.name?.replace(/\s+/g, '-')}`} className="flex bg-[rgba(255,0,0,0.70)] hover:bg-[rgba(255,0,0,0.60)] px-4 py-2 rounded-3xl w-fit gap-2 items-center flex-shrink-0">
                            <FaPlay className="cursor-pointer" size='24px' />
                            <button>Play Trailer</button>
                        </Link>
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-full h-screen brightness-50 opacity-25">
                    <img
                        className="w-full h-full object-cover"
                        src={backdrop_path ? url + backdrop_path : empty}
                        alt={name || 'Unavailable'}
                    />
                </div>
            </div>

            <p className="rounded-md px-2 py-1 mx-10 text-3xl mt-36">Series Cast</p>
            <div
                className="flex items-center gap-6 px-10 mx-6 py-10 overflow-x-auto">
                {creditTv?.cast?.length > 0 ? (
                    creditTv?.cast?.map((castMember) => {
                        const { id, profile_path, name, character } = castMember;
                        return (
                            <Link key={id || name} to={`/to-persons/${id}-${name?.replace(/\s+/g, "-")}`} className="custom-drop-shadow hover:scale-105 flex flex-col flex-shrink-0 items-center w-[140px] 2xl:w-[200px] overflow-hidden cursor-pointer">
                                <img
                                    className="w-full h-[200px] rounded-xl md:h-[260px] object-cover"
                                    src={profile_path ? `${url}${profile_path}` : empty}
                                    alt={`${name} as ${character}`}
                                    loading="lazy" // Optimize image loading
                                    onError={(e) => (e.target.src = empty)} 
                                />
                                <div className="font-semibold py-2 px-4 w-full">
                                    <p className="truncate text-[12px] md:text-[14px] xl:text-base">
                                        {name}
                                    </p>
                                    <p className="truncate text-[10px] md:text-[12px] xl:text-[14px]">
                                        {character}
                                    </p>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p className="text-gray-400 text-start w-full px-2">We don't have any cast information available.</p>
                )}
            </div>

            <div className="mx-10 my-4 w-fit rounded-md px-2 py-1 hover:text-blue-500 cursor-pointer">
                <Link to={`/tv/${tvs?.id}-${original_name?.replace(/\s+/g, '-')}/cast&crew`}>Full Cast & Crew</Link>
            </div>
        </>
    );
}