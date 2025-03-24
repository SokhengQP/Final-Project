import { useDispatch, useSelector } from "react-redux";
import { fetchTvEpisode } from "../../../features/tv-actions/tvAction"
import { useEffect } from "react";
import { useParams } from "react-router";

export default function TotalEpi() {
    const dispatch = useDispatch();
    const { tvEpi } = useSelector((state) => state.myTvs);
    const { id, season_number } = useParams();

    useEffect(() => {
        dispatch(fetchTvEpisode({ id, season_number }));
    }, []);

    return (
        <>
            <div className="mt-[120px]">
                <p>Total Episodes</p>
                {
                    tvEpi?.episodes?.map(episode => {
                        const { id, air_date, episode_number, name } = episode;
                        return (
                            <div key={id}>
                                <div>{air_date}</div>
                                <p>{episode_number}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}