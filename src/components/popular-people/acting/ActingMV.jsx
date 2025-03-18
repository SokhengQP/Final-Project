import { useDispatch, useSelector } from "react-redux";
import { fetchCombinedCredit } from "../../../features/people/peopleAction";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router"; // Note: should be "react-router-dom" in modern versions
import { convertDate, url } from '../../../utility';
import { FaTv } from "react-icons/fa6";
import { RiMovie2AiLine } from "react-icons/ri";
export default function ActingMV() {
    const { combinedCredit } = useSelector((state) => state.people);
    const { id } = useParams();
    const dispatch = useDispatch();

    // Initialize with 'movie' as lowercase string
    const [mediaType, setMediaType] = useState('movie');

    // Fetch data when id changes
    useEffect(() => {
        dispatch(fetchCombinedCredit(id));
    }, [id, dispatch]);

    const { cast, crew } = combinedCredit || {}; // Add fallback to prevent undefined errors

    const uniqueCrew = useMemo(() => {
        return [...new Set(crew?.map(item => item?.department))];
    }, [crew]);

    // Toggle between movie and tv
    const toggleMediaType = () => {
        setMediaType(prev => prev === 'movie' ? 'tv' : 'movie');
    };

    // Filter cast based on mediaType
    const filteredCast = useMemo(() => {
        return cast?.filter(item => item.media_type === mediaType)
            .sort((a, b) => new Date(b?.release_date || 0) - new Date(a?.release_date || 0));
    }, [cast, mediaType]);


    const filteredCrew = useMemo(() => {
        return crew?.filter(item => item?.media_type === mediaType)
            .sort((a, b) => new Date(b?.release_date || 0) - new Date(a?.release_date || 0));
    }, [crew, mediaType]);

    const movieLength = (medias) => {
        return cast?.filter(item => item.media_type === medias)?.length;
    }


    return (
        <>
            
            <div className="font-semibold flex justify-between items-center p-2 gap-4 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                <p className="text-2xl">Acting</p>
                <button
                    onClick={toggleMediaType}
                    className="bg-transparent outline-none rounded-xl text-md px-4"
                >
                    {
                        mediaType === 'movie' ?
                            <div className="flex gap-8 items-center transition-all duration-500 justify-between py-2 group border border-transparent hover:border-current rounded-xl px-4 w-[160px]">
                                <p>Movie</p>
                                <aside className="group-hover:text-current relative ">
                                    <RiMovie2AiLine size={'20px'} className="group-hover:translate-x-1 " />
                                    <p className="absolute -top-5 -right-5 px-2 rounded-md bg-[red] shadow-[0_0_6px_red] text-white text-sm">{movieLength('movie') || 0}</p>
                                </aside>

                            </div>
                            :
                            <div className="flex gap-8 items-center justify-between py-2 grouptransition-all duration-200 group  border border-transparent hover:border-current rounded-xl px-4 w-[160px]">
                                <p>TV show</p>
                                <aside className="group-hover:drop-shadow-2xl group-hover:shadow-purple-400 relative ">
                                    <FaTv size={'20px'} className="group-hover:scale-105 group-hover:drop-shadow-2xl " />
                                    <p className="absolute -top-5 -right-5 px-2 rounded-md bg-[red] shadow-[0_0_4px_red] text-white text-sm">{movieLength('tv') || 0}</p>
                                </aside>

                            </div>
                    }
                </button>
            </div>

            <div className="flex flex-col gap-6 bg-[var(--bg-secondary)] dark:bg-[var(--bg-acting)] p-6 border-2 border-[var(--border-color)] rounded-xl shadow-sm">
                {filteredCast?.length > 0 ? (
                    filteredCast?.map((item) => (
                        <Link
                            to={`/${mediaType}-details/${item.id}`}
                            key={item.id}
                            className="flex items-center gap-4 border border-[var(--border-color)] rounded-lg px-4 py-3 bg-white hover:bg-[var(--accent-hover)] transition-colors dark:bg-gray-700 dark:hover:bg-[var(--accent-hover)]"
                        >
                            <section className="flex items-center gap-6 w-full">
                                <p className="px-3 py-1 text-sm text-[var(--text-secondary)] bg-[var(--accent-hover)] rounded-md dark:bg-gray-600 dark:text-gray-300">
                                    {item.media_type === 'movie' && item.release_date
                                        ? convertDate(item.release_date)
                                        : item.media_type === 'tv' && item.first_air_date
                                            ? convertDate(item.first_air_date)
                                            : 'TBA'}
                                </p>
                                <aside className="flex flex-col gap-1">
                                    <p className="text-lg font-medium text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                                        {item.title || item.name}
                                    </p>
                                    <hr />
                                    <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400">
                                        {item.character ? `as ${item.character}` : 'Character N/A'}
                                    </p>
                                </aside>
                            </section>
                        </Link>
                    ))
                ) : (
                    <p className="text-[var(--text-secondary)] dark:text-gray-400">
                        No {mediaType === 'movie' ? 'movies' : 'TV shows'} found.
                    </p>
                )}
            </div>


            {/* Crew section remains unchanged */}
            <div className="">
                {uniqueCrew?.map((department) => (
                    <div key={department} className="my-12 flex flex-col gap-6 bg-[var(--bg-secondary)] dark:bg-[var(--bg-acting)] p-6 border-2 border-[var(--border-color)] rounded-xl shadow-sm">
                        <h2 className="text-2xl">{department}</h2>
                        {filteredCrew?.filter((mores) => mores.department === department)
                            .sort((a, b) => {
                                const dateA = a.release_date ? new Date(a.release_date) : null;
                                const dateB = b.release_date ? new Date(b.release_date) : null;
                                if (!dateA && !dateB) return 0;
                                if (!dateA) return 1;
                                if (!dateB) return -1;
                                return dateB - dateA;
                            })
                            .map(yeah => (
                                <Link
                                    to={`/${yeah.media_type}-details/${yeah.id}`}
                                    key={yeah.id}
                                    className="flex items-center gap-4 border border-[var(--border-color)] rounded-lg px-4 bg-white hover:bg-[var(--accent-hover)] transition-colors dark:bg-gray-700 dark:hover:bg-[var(--accent-hover)]"
                                >
                                    <section className="flex items-center gap-6 w-full">
                                        <p className="px-3 py-1 text-sm text-[var(--text-secondary)] bg-[var(--accent-hover)] rounded-md dark:bg-gray-600 dark:text-gray-300">
                                            {yeah.release_date ? convertDate(yeah.release_date) : 'TBA'}

                                        </p>
                                        <aside className="flex flex-col gap-1 my-2">
                                            <p className="text-lg font-medium text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                                                {yeah.title || yeah.name ? yeah.title || yeah.name : null}
                                            </p>
                                            <hr />
                                            <section className={`text-sm flex items-center gap-1 text-[var(--text-secondary)] dark:text-gray-400 `}>
                                                <p className={`${yeah.episode_count || 'hidden'}`}>{yeah.episode_count && `${yeah.episode_count} episode${yeah.episode_count > 1 ? 's' : ''}`}</p>
                                                {`as ${yeah.job}` || null}
                                            </section>
                                        </aside>
                                    </section>
                                </Link>
                            ))}
                    </div>
                ))}
            </div>
        </>
    );
}