import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"; // Correct import for react-router-dom
import { fetchMoviesVideo } from "../../../features/movie-action/movieAction";
import { Pagination } from "flowbite-react";
import { CgUnavailable } from "react-icons/cg";


export default function VideoType() {
    
    const dispatch = useDispatch();
    const { id } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 8;

    // Access the video array directly from Redux
    const { detailsVideo } = useSelector(state => state.movie);

    useEffect(() => {
        dispatch(fetchMoviesVideo(id));
    }, []);

    if (!Array.isArray(detailsVideo.results) || detailsVideo.results.length === 0) {
        return <div className="flex justify-center mt-40 items-center">
            <CgUnavailable size={'60px'} className="text-red-600" />
            <p className="text-center p-4 rounded-md text-2xl font-[700] scale-y-105">No videos available.</p>
        </div>
    }

    // Pagination logic
    const startIndex = (currentPage - 1) * videosPerPage;
    const paginatedVideos = detailsVideo.results.slice(startIndex, startIndex + videosPerPage);
    const totalPages = Math.ceil(detailsVideo.results.length / videosPerPage);

    return (
        <div className="my-[120px] px-8 md:py-16">
            <div className="flex justify-between items-center flex-col py-2">
                <h2 className="text-xl font-semibold text-start md:text-xl xl:text-2xl">Total Videos: {detailsVideo.results?.length}</h2>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className={`mb-2 p-0`}
                />
            </div>

            <h3 className="text-xl hover:underline cursor-pointer px-4 md:px-16 py-2">Official Trailer</h3>
            <div className="flex gap-8 px-4 md:px-16 md:gap-16 overflow-x-auto">
                {
                    detailsVideo.results?.filter(video => video.type === 'Trailer')?.map(item => (
                        <div key={item.key} className="aspect-video overflow-clip hover:scale-105 group">
                            <iframe
                                allowFullScreen
                                src={`https://www.youtube.com/embed/${item.key}`}
                                className="rounded-xl"
                            />
                            <p className="mt-2 text-start px-4 text-wrap group-hover:text-blue-500 text-ellipsis">{item.name}</p>
                        </div>
                    ))
                }
            </div>

            <h3 className="text-xl mt-10 hover:underline cursor-pointer px-4 md:px-16 py-2">Others</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 px-4 md:px-16 gap-8 md:gap-16">
                {
                    paginatedVideos ? paginatedVideos?.filter(video => video.type !== 'Trailer')?.map(item => (
                        <div key={item.key} className="aspect-video overflow-clip hover:scale-105 group">
                            <iframe
                                allowFullScreen
                                src={`https://www.youtube.com/embed/${item.key}`}
                                className="w-full h-full rounded-xl"
                                loading="lazy"
                            />
                            <p className="mt-2 text-start px-4 text-wrap group-hover:text-blue-500 text-ellipsis">{item.name}</p>
                        </div>
                    )) : <p>No videos</p>
                } 
            </div>
        </div>
    );
}
