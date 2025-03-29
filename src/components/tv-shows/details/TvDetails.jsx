import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchTv, fetchCreditTv } from "../../../features/movie-action/movieAction.js";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";
import { convertBirthday, convertDate, faces, fallbackImg, innerDate, Votes, faces_original } from '../../../utility.js';
import ProgressRounded from "../../movies/details/ProgressRounded.jsx";
import { GrOverview } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { addToFavorites } from "../../../features/favorite-action/favouriteSlice.js";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function TvDetails() {

    const params = useParams();

    const dispatch = useDispatch();
    const { tvs, creditTv } = useSelector((state) => state.movie);
    const { favorites } = useSelector(state => state.favorites);

    useEffect(() => {
        document.title = 'TV Details';
        dispatch(fetchTv(params.id));
        dispatch(fetchCreditTv(params.id));
    }, [dispatch, params.id]);

    const { poster_path, original_name, name, overview, vote_average, first_air_date, genres, backdrop_path, id, seasons, last_episode_to_air, last_air_date } = tvs;

    const handleAddToFavorites = (movie) => {
        setTimeout(() => {
            const movieItem = { ...movie, media_type: 'tv' };
            dispatch(addToFavorites(movieItem));
        }, 500);
    };

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.id === movieId);
    };

    const isFav = isFavorite({ id });

    const [visibleCount, setVisibleCount] = useState(8);
    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 8);
    };

    return (
        <>
            {/* Background Image */}
            <div id="back-to-tv" className="fixed w-full top-0 brightness-125 2xl:brightness-50 -z-50 opacity-25">
                <img
                    className="w-full h-fit sm:h-screen object-cover aspect-video"
                    src={backdrop_path ? faces_original + backdrop_path : fallbackImg}
                    alt={name || 'Unavailable'}
                    loading="lazy"
                    onError={(e) => (e.target.src = empty)}
                />
            </div>

            {/* Main Content */}
            <div className="relative px-8 md:px-16">
                <div className="grid grid-cols-1 2xl:grid-cols-2 mt-20 sm:mt-24 md:mt-[120px] place-content-center rounded-3xl relative overflow-hidden">
                    {/* Poster Image (Hidden on smaller screens) */}
                    <div className="z-10 group cursor-pointer hidden 2xl:flex items-center justify-center">
                        <img
                            className="object-cover rounded-xl brightness-125 w-[40%]"
                            src={poster_path ? faces + poster_path : fallbackImg}
                            alt={original_name ? original_name : "Unavailable"}
                            loading="lazy"
                            onError={(e) => (e.target.src = empty)}
                        />
                    </div>

                    {/* TV Details */}
                    <div className="z-10 flex flex-col gap-6 sm:p-6 rounded-xl w-fit pt-8">
                        {/* Title and Rating */}
                        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold custom-drop-shadow cursor-pointer text-wrap">
                                {name || 'Loading...'}
                            </p>
                            <div className="w-12 h-12 sm:w-14 sm:h-14">
                                <ProgressRounded value={Votes(vote_average) || "0"} />
                            </div>
                        </section>

                        {/* Metadata (Date, Genres) */}
                        <section className="flex items-center gap-2 sm:gap-4 flex-wrap text-gray-400">
                            <aside className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
                                <MdDateRange size="20" className="sm:w-6 sm:h-6" />
                                <span>{first_air_date ? innerDate(first_air_date) : 'MM DD, YYYY'}</span>
                            </aside>

                            <aside className="flex items-center gap-2 flex-wrap">
                                {genres?.map((item) => (
                                    <Link
                                        key={item?.id}
                                        to={`/genre/${item.id}-${item.name?.replace(/\s+/g, '-')}/tv`}
                                        className="text-xs sm:text-sm md:text-base text-nowrap bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-3xl"
                                    >
                                        {item.name}
                                    </Link>
                                )) || "Not Found"}
                            </aside>
                        </section>

                        {/* Overview */}
                        <section className="flex flex-col gap-2 cursor-pointer">
                            <aside className="flex items-center gap-2">
                                <GrOverview size="20" className="sm:w-6 sm:h-6" />
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Overview</h3>
                            </aside>
                            <p className="text-sm sm:text-base md:text-lg max-w-[600px] overflow-y-auto">
                                {overview || "We don't have an overview translated in English."}
                            </p>
                        </section>

                        {/* Play Trailer Button */}
                        <div className="flex flex-shrink-0 justify-between gap-4 w-full">
                            <Link
                                to={`/video/${tvs?.id}`}
                                className="flex flex-shrink-0 gap-2 justify-center items-center rounded-3xl text-md flex-grow bg-red-500 py-2"
                            >
                                <FaPlay className="cursor-pointer" />
                                <button>Play Trailer</button>
                            </Link>

                            <button
                                className={`flex flex-shrink-0 justify-center flex-grow items-center rounded-3xl text-md ${isFav ? 'cursor-not-allowed bg-black' : 'bg-[#090109] text-white '}`}
                                onClick={() => handleAddToFavorites(tvs)}
                                disabled={isFav}
                            >

                                {isFav ?
                                    <div className="flex items-center gap-2 text-white">
                                        Added
                                        <p className="text-red-500">
                                            <MdFavorite />
                                        </p>
                                    </div> :
                                    <p className="flex items-center gap-2">Add to Favorite <span>
                                        <MdFavoriteBorder />
                                    </span> </p>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Series Cast Section */}
            <p className="rounded-md mx-8 py-2 md:mx-16 text-xl sm:text-2xl md:text-3xl mt-12 sm:mt-24 md:mt-36 font-semibold">
                Series Cast
            </p>

            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto mx-8 md:mx-16 py-6 sm:py-8 md:py-10 z-50">
                {creditTv?.cast ? (
                    creditTv?.cast?.slice(0, visibleCount)?.map((castMember) => {
                        const { id, profile_path, name, character } = castMember;
                        return (
                            <div key={id || name}>
                                <Link
                                    to={`/to-persons/${id}-${name?.replace(/\s+/g, "-")}`}
                                    className=" hover:scale-105 flex flex-col flex-shrink-0 items-center w-[120px] sm:w-[140px] 2xl:w-[200px] cursor-pointer"
                                >
                                    <img
                                        className="w-full h-[180px] sm:h-[200px] md:h-[260px] rounded-xl object-cover"
                                        src={profile_path ? `${faces}${profile_path}` : fallbackImg}
                                        alt={`${name} as ${character}`}
                                        loading="lazy"
                                        onError={(e) => (e.target.src = fallbackImg)}
                                    />
                                    <div className="font-semibold py-2 px-4 w-full text-center">
                                        <p className="truncate text-xs sm:text-[12px] md:text-[14px] xl:text-base">
                                            {name}
                                        </p>
                                        <p className="truncate text-[10px] sm:text-[10px] md:text-[12px] xl:text-[14px] text-gray-400">
                                            {character}
                                        </p>
                                    </div>
                                </Link>
                            </div>

                        );
                    })
                ) : (
                    <p className="text-gray-400 text-start w-full px-2">We don't have any cast information available.</p>
                )}
                <button>
                    {creditTv?.cast && visibleCount < creditTv?.cast?.length && (
                        <div className="text-center py-4">
                            <button
                                onClick={loadMore}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-nowrap"
                            >
                                Load more
                            </button>
                        </div>
                    )}
                </button>
            </div>

            <br />
            <hr className="mx-16"></hr>

            {/* Full Cast & Crew Link */}
            <div className="px-8 md:px-16 my-4 w-fit rounded-md py-1 hover:text-blue-500 cursor-pointer custom-drop-shadow hover:scale-105 text-sm sm:text-base md:text-lg">
                <Link to={`/tv/${tvs?.id}-${original_name?.replace(/\s+/g, '-')}/cast&crew`}>
                    Full Cast & Crew
                </Link>
            </div>

            <div className="mx-8 md:mx-16 ">
                {(() => {
                    if (!Array.isArray(seasons) || seasons.length === 0) {
                        return <li>No seasons available</li>;
                    }
                    const lastSeason = seasons[seasons.length - 1];
                    const { id, air_date, season_number, poster_path, episode_count, name } = lastSeason;
                    return [
                        <div className="flex cursor-pointer" key={id}>
                            <div className="px-2 overflow-clip">
                                <img className={`w-32 rounded-md`} src={poster_path ? faces + poster_path : fallbackImg} alt="" />
                            </div>
                            <div className="flex flex-col justify-center px-2 text-sm flex-shrink gap-2">
                                <Link to={`/tv-episode/${id ? tvs?.id : name}/seasons/${season_number}`} className="text-xl font-bold">Season {season_number}</Link>
                                <p className="flex items-center ">{convertDate(air_date)} &nbsp; <GoDotFill size={'12px'} /> &nbsp; {episode_count} Episodes</p>

                                <p className="text-wrap">{name} of {tvs?.original_name} premiered on {convertBirthday(air_date)}.</p>

                                <p className="flex flex-col md:flex-row  gap-2 items-start md:items-center ">
                                    <FaRegCalendarAlt size={'20px'} />
                                    <span className="text-nowrap">{last_episode_to_air?.name}</span>
                                    <p className="text-nowrap">({season_number}x{last_episode_to_air?.episode_number}, {convertBirthday(last_air_date)})</p>
                                    <span className="border px-2 py-1 rounded-md text-nowrap ">Season {last_episode_to_air?.episode_type?.charAt(0)?.toUpperCase() + last_episode_to_air?.episode_type?.slice(1)}</span>
                                </p>
                            </div>
                        </div>
                    ];
                })()}
            </div>

            <Link to={`/tv-seasons/${id}/seasons`} className="mx-8 md:mx-16">View All Seasons</Link>

        </>
    );
}