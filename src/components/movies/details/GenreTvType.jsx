import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscoverTv, fetchGenreTv, fetchTv } from '../../../features/movie-action/movieAction';
import { Link, useParams } from 'react-router'; // Fixed import
import { Pagination } from 'flowbite-react';
import { setPage } from '../../../features/movie-action/movieSlice';
import { innerDate, fallbackImg, faces } from '../../../utility';



export default function GenreTvType() {

    const { genre_id } = useParams();
    const params = useParams();
    const dispatch = useDispatch();
    const { discoverTv, genreTv, page } = useSelector((state) => state.movie);
    const totalPages = discoverTv?.total_pages || 1;
    const genreId = Number(genre_id?.split('-')[0]);

    useEffect(() => {
        dispatch(fetchDiscoverTv({ genreId, page }));
        dispatch(fetchGenreTv());
        dispatch(fetchTv(params.id));
    }, [dispatch, genre_id, page]);

    function genreName() {
        return genreTv?.genres?.find(item => item.id === genreId)?.name || "Unknown";
    }

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };
    const [isOnLoad, setIsOnLoad] = useState(false)
    return (
        <div className='my-[120px] px-24'>
            <div className='flex flex-col xl:flex-row justify-between items-center '>
                <div className='text-3xl'>
                    <aside>{genreName()}</aside>
                </div>
                <Pagination
                    currentPage={page}
                    totalPages={totalPages ?? 1}
                    onPageChange={handlePageChange}
                    showIcons
                    className="mb-2 p-0"
                />
            </div>

            <ul className="grid grid-cols-1 gap-8 sm:gap-6 md:gap-8 mt-4">
                {discoverTv.results?.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/tv-details/${movie.id}`}
                        className=" flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-xl overflow-hidden shadow-[0_0_2px_gray] dark:bg-[#374151]"
                    >
                        <img
                            onLoad={() => setIsOnLoad(true)}
                            className={`object-cover w-full sm:w-[120px] md:w-[140px] aspect-square h-auto sm:h-full max-h-[200px] sm:max-h-none ${!isOnLoad ? 'blur-xl' : ''}`}
                            src={movie.poster_path ? faces + movie.poster_path : fallbackImg}
                            alt={movie.name}
                        />

                        <aside className="h-full flex flex-col justify-center gap-y-3 sm:gap-y-4 p-3 sm:p-4">
                            <div>
                                <section className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-bold hover:text-blue-500">
                                    {movie.name}
                                </section>
                                <section className="text-gray-400 text-xs sm:text-sm">
                                    {innerDate(movie.first_air_date)}
                                </section>
                            </div>

                            <div>
                                <div className="text-xs sm:text-sm md:text-base line-clamp-3">
                                    {movie.overview}
                                </div>
                            </div>
                        </aside>
                    </Link>
                ))}
            </ul>
        </div>
    );
};
