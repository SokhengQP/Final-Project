import { useDispatch, useSelector } from "react-redux";
import { fetchTvEpisode } from "../../../features/tv-actions/tvAction";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { convertBirthday, convertDate, convertRuntime, faces_original, fallbackImg, Votes } from "../../../utility";
import { IoArrowBack } from "react-icons/io5";
import ProgressRounded from "../../movies/details/ProgressRounded";
import { GoDotFill } from "react-icons/go";
import { fetchTv } from "../../../features/movie-action/movieAction";
import { setPage } from '../../../features/tv-actions/tvSlice';

export default function TotalEpi() {

    const dispatch = useDispatch();
    const { tvEpi } = useSelector((state) => state.myTvs);
    const { tvs } = useSelector(state => state.movie);
    const { id, season_number } = useParams();
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);

    const [currentSeason, setCurrentSeason] = useState(parseInt(season_number));

    useEffect(() => {
        dispatch(fetchTvEpisode({ id, season_number: currentSeason }));
        dispatch(fetchTv(id));
    }, [dispatch, id, currentSeason]);

    const totalSeasonNumber = tvs.seasons?.length;

    const handleNext = () => {
        const nextSeason = currentSeason + 1
        if (nextSeason < totalSeasonNumber) {
            setTimeout(() => {
                setCurrentSeason(nextSeason);
                dispatch(setPage(nextSeason));
                navigate(`/tv-episode/${id}/seasons/${nextSeason}`);
            }, 200)
        }
    };


    const handlePrevious = () => {
        const prevSeason = currentSeason - 1;
        if (prevSeason >= 0) {
            setTimeout(() => {
                setCurrentSeason(prevSeason);
                dispatch(setPage(prevSeason));
                navigate(`/tv-episode/${id}/seasons/${prevSeason}`);
            }, 200)
        }
    };

    const [loadmore, setLoadmore] = useState(8);
    const theLoader = () => {
        setLoadmore(content => content + 8);
    };

    return (
        <>
            <div className="mt-[120px] flex flex-col md:flex-row md:items-center md:justify-between backdrop-blur-xl bg-[#80808020] py-4 px-8 md:px-16">
                <div className="flex justify-start items-center flex-shrink-0">
                    <aside className="rounded-xl border">
                        <img
                            onLoad={() => setIsLoaded(true)}
                            onError={() => setIsLoaded(false)}
                            className="w-32 h-32 object-contain flex flex-shrink-0"
                            src={tvEpi?.poster_path ? faces_original + tvEpi?.poster_path : fallbackImg}
                            alt="Season Poster"
                        />
                    </aside>
                    <section className="flex flex-col font-bold gap-2 px-2">
                        <p className="flex items-center text-xl">
                            <p>{tvEpi.name}</p>
                            <span className="px-4">{tvEpi?.air_date ? convertDate(tvEpi?.air_date) : ""}</span>
                        </p>
                        <Link to={`/tv-details/${id}`} className="flex items-center gap-2 flex-shrink-0 text-sm">
                            <IoArrowBack />
                            <p>Back to season list</p>
                        </Link>
                    </section>
                </div>
                <div className="text-xl py-4">
                    <p>Episodes {tvEpi?.episodes?.length || 0}</p>
                </div>
            </div>

            <br />

            <div className="flex justify-between px-8 md:px-16 ">
                <button
                    className={`bg-blue-700 hover:bg-blue-500 border-gray-600  px-4 py-1 rounded-md ${currentSeason <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handlePrevious}
                    disabled={currentSeason <= 0}
                >
                    Previous
                </button>
                <button
                    className={`bg-blue-700 hover:bg-blue-500 border-gray-600 px-4 py-1 rounded-md ${currentSeason >= totalSeasonNumber - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleNext}
                    disabled={currentSeason >= totalSeasonNumber - 1}
                >
                    Next
                </button>
            </div>

            <br />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-content-center gap-16 px-8 md:px-16">
                {tvEpi && tvEpi.episodes?.length ? (
                    tvEpi.episodes.slice(0, loadmore)?.map((episode) => {
                        const { name, air_date, still_path, vote_average, episode_number, runtime, overview } = episode;
                        return (
                            <div key={episode.id} className="flex flex-col backdrop-blur-xl hover:bg-[#80808020] rounded-2xl justify-center items-center relative group cursor-pointer hover:backdrop-blur-xl ">
                                <div className="relative rounded-lg overflow-clip">

                                    <img className="peer" src={still_path ? faces_original + still_path : fallbackImg} alt={name} />
                                    <div className="p-2 absolute -bottom-24 peer-hover:bottom-2 hover:bottom-2 duration-200 mx-2 backdrop-blur-3xl rounded-lg w-[96%] bg-[#a5a5a549] transition-all">
                                        <aside className="flex gap-2 items-center text-xs md:text-lg font-bold">
                                            <p className="self-start">{episode_number}</p>
                                            <p className="truncate">{name}</p>
                                        </aside>
                                        <aside className="flex gap-2 items-center text-xs overflow-hidden md:text-sm ">
                                            <p className="self-start ">{runtime}</p>
                                            <p className="truncate sm:line-clamp-2 sm:text-wrap">{overview}</p>
                                        </aside>
                                    </div>

                                </div>

                            </div>
                        );
                    })
                ) : (
                    <p className="text-blue-500 text-center text-2xl">
                        {tvEpi === null ? "Loading..." : "There are no episodes added to this season."}
                    </p>
                )}
                <button
                    onClick={theLoader}
                    className={`bg-blue-700 hover:bg-blue-500 border-gray-600 w-full py-4 rounded-lg ${loadmore < (tvEpi?.episodes?.length || 0) ? theLoader : 'hidden'} transition delay-[4s] ease-in-out h-fit self-center`}
                >
                    Load more
                </button>
            </div>
        </>
    );
}