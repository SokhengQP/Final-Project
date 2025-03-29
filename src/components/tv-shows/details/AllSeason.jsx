import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTv } from "../../../features/movie-action/movieAction"
import { useParams } from "react-router"
import { faces, fallbackImg } from "../../../utility";


export default function AllSeason() {
    const params = useParams();
    const dispatch = useDispatch()
    const { tvs } = useSelector((state) => state.movie);
    useEffect(() => {
        dispatch(fetchTv(params.id))
    }, [])

    const [isLoadedMore, setIsLoaded] = useState(8)
    const loadmore = () => {
        setIsLoaded(load => load + 8);
    }

    return (
        <>
            <div className="mt-[120px] gap-6 ">
                {
                    tvs.seasons.slice(0, isLoadedMore)?.map(season => {
                        console.log(season)
                        const { air_date, episode_count, id, name, overview, poster_path, season_number, vote_average } = season;
                        return (
                            <div key={id} className="border flex gap-6 items-center px-8 md:px-16">

                                <img
                                    className="w-32"
                                    src={poster_path ? faces + poster_path : fallbackImg}
                                    alt=""
                                />
                                <div className="flex flex-col ">

                                    <p>{name}</p>
                                    <div className="flex gap-2">
                                        <p className="px-2 rounded-sm bg-white text-black">{vote_average}</p>
                                        <p>{episode_count} episdoes</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <button onClick={loadmore}>
                    {isLoadedMore}
                </button>
            </div>
        </>
    )
}