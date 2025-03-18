import { useDispatch, useSelector } from "react-redux"
import { fetchCombinedCredit } from "../../../features/people/peopleAction";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { convertDate, url } from '../../../utility';

export default function ActingTV() {

    const { combinedCredit } = useSelector((state) => state.people);
    const { id } = useParams();
    const disp = useDispatch();

    useEffect(() => {
        disp(fetchCombinedCredit(id));
    }, []);

    const { cast, crew } = combinedCredit;


    return (
        <>
            <div className="text-2xl font-semibold flex justify-between items-center p-2 gap-4 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                <p>Acting</p>
                <select className="bg-transparent border border-blue-500 outline-none rounded-xl">
                    <option className="dark:bg-[var(--bg-secondary)] bg-[var(--bg-primary)]" value="movie" selected>Movie</option>
                    <option className="dark:bg-[var(--bg-secondary)] bg-[var(--bg-primary)]" value="tv" >TV</option>
                </select>

            </div>

            <div className="flex flex-col gap-6 bg-[var(--bg-secondary)] dark:bg-[var(--bg-acting)] p-6 border-2 border-[var(--border-color)] rounded-xl shadow-sm ">
                {
                    cast?.filter((item) => item.media_type === 'tv')?.sort((a, b) => (new Date(b?.release_date) - new Date(a?.release_date)))?.map((movie) => (
                        <Link
                            to={`/movie-details/${movie.id}`}
                            key={movie.id}
                            className="flex items-center gap-4 border border-[var(--border-color)] rounded-lg px-4 py-3 bg-white hover:bg-[var(--accent-hover)]  transition-colors dark:bg-gray-700 dark:hover:bg-[var(--accent-hover)]"
                        >
                            <section className="flex items-center gap-6 w-full ">
                                <p className="px-3 py-1 text-sm text-[var(--text-secondary)] bg-[var(--accent-hover)] rounded-md dark:bg-gray-600 dark:text-gray-300">
                                    {movie.first_air_date ? convertDate(movie.first_air_date) : 'TBA'}
                                </p>
                                <aside className="flex flex-col gap-1">
                                    <p className="text-lg font-medium text-[var(--text-primary)] dark:text-[var(--text-primary)]">{movie.name}</p>
                                    <hr />
                                    <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400">
                                        {movie.character ? `as ${movie.character}` : 'Character N/A'}
                                    </p>
                                </aside>

                            </section>

                        </Link>
                    )) ?? <p className="text-[var(--text-secondary)] dark:text-gray-400">No movies found.</p>}
            </div>
        </>
    )
}