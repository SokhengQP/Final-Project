import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTv } from "../../../features/movie-action/movieAction"
import { Link, useParams } from "react-router"
import { faces, faces_original, fallbackImg } from "../../../utility";
import { IoArrowBack } from "react-icons/io5";


export default function AllSeason() {
    const params = useParams();
    const dispatch = useDispatch()
    const { tvs } = useSelector((state) => state.movie);
    useEffect(() => {
        dispatch(fetchTv(params.id))
    }, [])

    

    return (
        <>


            <div className="mt-[120px] py-4">
                <aside className="px-8 md:px-16 rounded-xl flex items-center w-full">
                    <img
                        onLoad={() => setIsLoaded(true)}
                        onError={() => setIsLoaded(false)}
                        className="w-24 h-24 object-contain flex flex-shrink-0 border rounded-xl"
                        src={tvs?.poster_path ? faces_original + tvs?.poster_path : fallbackImg}
                        alt="Season Poster"
                    />
                    <section className="flex flex-col font-bold gap-2 mx-8">
                        <p className="flex items-center text-xl">
                            <p>{tvs?.name}</p>
                            <span className="px-4">{tvs?.air_date ? convertDate(tvs?.air_date) : ""}</span>
                        </p>
                        <div>Total episode</div>
                        <Link to={`/tv-details/${tvs?.id}`} className="flex items-center gap-2 flex-shrink-0 text-sm">
                            <IoArrowBack />
                            <p>Back to season list</p>
                        </Link>
                    </section>
                </aside>
            </div>


            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 md:px-16">
                {
                    tvs.seasons?.map(season => {
                        console.log(season)
                        const { air_date, episode_count, id, name, overview, poster_path, season_number, vote_average } = season;
                        return (
                            <Link
                                to={`/tv-episode/${tvs?.id}/seasons/${season_number}`}
                                key={id}
                                className=" flex gap-6  items-center p-4 hover:bg-[#80008070] rounded-3xl">
                                <img
                                    className="rounded-md h-36 "
                                    src={poster_path ? faces + poster_path : fallbackImg}
                                    alt=""
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-bold text-lg">{name}</p>

                                    <div className="flex items-center gap-2 text-sm">
                                        <p className="px-2 rounded-sm bg-white text-black">{vote_average * 10}%</p>
                                        <p className="text-nowrap">{episode_count} episdoes</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
              
            </div>
        </>
    )
}