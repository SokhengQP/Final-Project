import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscoverTv, fetchGenreTv, fetchTv } from '../../../features/movie-action/movieAction';
import { Link, useParams } from 'react-router'; // Fixed import
import { Pagination } from 'flowbite-react';
import { setPage } from '../../../features/movie-action/movieSlice';
import { innerDate } from '../../../utility';

const empty = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
const url = `https://image.tmdb.org/t/p/original`;

export default function GenreTvType() {

    const { genre_id } = useParams();
    const params = useParams();
    const dispatch = useDispatch();
    const { discoverTv, genreTv, tvs, page } = useSelector((state) => state.movie);
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

    console.log("tv",tvs);
    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    return (
        <div className='my-[120px] px-24'>
            <div className='flex justify-between items-center '>
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

            <ul className='grid grid-cols-1 gap-8 '>
                {
                    discoverTv.results?.map((movie) => (
                        <Link key={movie.id} to={`/tv-details/${movie.id}`} className='hover:scale-105 flex items-center gap-4 rounded-xl overflow-clip shadow-[0_0_2px_gray] dark:bg-[#374151]'>
                            <img
                                className='object-contain w-[140px]'
                                src={movie.poster_path ? url + movie.poster_path : empty}
                                alt={movie.name}
                            />

                            <aside className='h-full flex flex-col justify-center gap-y-4 p-4'>
                                <div>
                                    <section className='text-base xl:text-[18px] 2xl:text-[24px] font-bold hover:text-blue-500'>{movie.name}</section>
                                    <section className='text-gray-400'>{innerDate(movie.first_air_date)}</section>
                                </div>
                                
                                <div>
                                    <div className='ellipsis-overview'>{movie.overview}</div>
                                </div>
                            </aside>

                        </Link>
                    ))
                }
            </ul>

        </div>
    );
};
