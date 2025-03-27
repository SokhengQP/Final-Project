import { useDispatch, useSelector } from "react-redux";
import { fetchTvEpisode } from "../../../features/tv-actions/tvAction";

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { convertBirthday, convertDate, convertRuntime, faces, faces_original, fallbackImg, Votes } from "../../../utility";
import { IoArrowBack } from "react-icons/io5";
import ProgressRounded from "../../movies/details/ProgressRounded";
import { GoDotFill } from "react-icons/go";
import { fetchTv } from "../../../features/movie-action/movieAction";
import { Pagination } from "flowbite-react";
import { setPage } from '../../../features/tv-actions/tvSlice';

export default function TotalEpi() {
    const dispatch = useDispatch();
    const { tvEpi } = useSelector((state) => state.myTvs);
    const { tvs } = useSelector(state => state.movie)
    const { id, season_number } = useParams();
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSeason, setCurrentSeason] = useState(parseInt(season_number, 10) || 1);

    // Fetch episodes when season changes
    useEffect(() => {
        dispatch(fetchTvEpisode({ id, season_number: currentSeason }));
        dispatch(fetchTv(id))
    }, [dispatch, id, currentSeason]);
    const totalSeasonNumber = (tvs?.last_episode_to_air?.season_number)

    const handlePageChange = (newSeason) => {
        if (newSeason >= 1 && newSeason <= totalSeasonNumber) {
            setCurrentSeason(newSeason);
            dispatch(setPage(newSeason)); // Optional: if you need this in Redux
            navigate(`/tv-episode/${id}/seasons/${newSeason}`);
        }
    };

    return (
        <>
            <div className="mt-[120px] flex flex-col md:flex-row md:items-center md:justify-between bg-[#daa520b7] py-4">
                <div className="flex justify-start items-center  flex-shrink-0">
                    <aside className="ml-8 md:ml-16 rounded-xl border">
                        <img
                            className="w-24 h-24 object-contain flex flex-shrink-0"
                            src={tvEpi?.poster_path ? faces_original + tvEpi?.poster_path : fallbackImg}
                            alt="Season Poster"
                        />
                    </aside>

                    <section className="flex flex-col  font-bold gap-2 mx-8">
                        <p className="flex items-center text-xl ">
                            <p>Season {tvEpi?.season_number || ''}</p>
                            <span className="px-4">{tvEpi?.air_date ? convertDate(tvEpi?.air_date) : ""}</span>
                        </p>
                        <Link to={`/tv-details/${id}`} className="flex items-center gap-2 flex-shrink-0 text-sm">
                            <IoArrowBack />
                            <p>Back to season list</p>
                        </Link>
                    </section>
                </div>

                <div className="mx-8 md:mx-16 text-xl py-4">
                    <p>Episodes {tvEpi?.episodes?.length || 0}</p>
                </div>
            </div>

            <div className="flex justify-center md:justify-end items-center px-16">
                <Pagination
                    currentPage={currentSeason}
                    totalPages={totalSeasonNumber}
                    onPageChange={handlePageChange}
                    className="mb-4 px-8 md:px-0"
                />
            </div>

            <div className="flex flex-col w-full gap-8 px-8 md:px-16">
                {tvEpi?.episodes?.length > 0 ? (
                    tvEpi.episodes?.map((episode) => {
                        const { name, air_date, still_path, vote_average, episode_number, runtime, overview } = episode;
                        return (
                            <div
                                key={episode.id}
                                className="flex gap-4 md:gap-8 rounded-2xl overflow-clip text-sm md:text-xl shadow-[0_0_4px] relative"
                            >
                                <div className="absolute top-4 right-4">
                                    <ProgressRounded value={Votes(vote_average)} />
                                </div>
                                <aside className={`${!isLoaded ? "blur-xl" : ""}`}>
                                    <img
                                        onError={() => setIsLoaded(true)}
                                        onLoad={() => setIsLoaded(true)}
                                        className="object-cover w-24 md:w-56 md:h-44 max-w-md bg-top"
                                        src={still_path ? faces + still_path : fallbackImg}
                                        alt={name}
                                    />
                                </aside>
                                <div className="flex flex-col justify-center gap-2 md:gap-4">
                                    <section className="flex flex-col">
                                        <div className="flex items-center text-lg md:text-2xl gap-4 md:gap-6 font-semibold">
                                            <span>{episode_number || " "}</span>
                                            <p className="text-md md:text-2xl truncate">{name}</p>
                                        </div>
                                        <div className="flex text-sm items-center gap-2 text-gray-400 ">
                                            <p>{convertBirthday(air_date) || ""}</p>
                                            <GoDotFill size={"12px"} />
                                            <p>{convertRuntime(runtime) || ""}</p>
                                        </div>
                                    </section>
                                    <section className="flex text-sm md:text-xl">
                                        <span className="line-clamp-1 md:line-clamp-2">
                                            {overview || "No overview available."}
                                        </span>
                                    </section>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-blue-500 text-center text-2xl">There are no episodes added to this season.</p>
                )}
            </div>
        </>
    );
}