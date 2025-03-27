import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"; 
import { fetchMoviesTv } from "../../../features/tv-actions/tvAction";
import { Pagination } from "flowbite-react";
import { CgUnavailable } from "react-icons/cg";

export default function VdoTv() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 8;

    // Access the video array directly from Redux
    const { videoTv } = useSelector(state => state.myTvs);

    useEffect(() => {
        dispatch(fetchMoviesTv(id)); // Changed from fetchMoviesVideo to match import
    }, [dispatch, id]); // Added dependencies

    console.log(videoTv); // Changed from detailsVideo to videoTv

    if (!Array.isArray(videoTv?.results) || videoTv?.results?.length === 0) {
        return (
            <div className="flex justify-center mt-40 items-center">
                <CgUnavailable size={'60px'} className="text-red-600" />
                <p className="text-center p-4 rounded-md text-2xl font-[700] scale-y-105">No videos available.</p>
            </div>
        );
    }

    // Pagination logic
    const startIndex = (currentPage - 1) * videosPerPage;
    const paginatedVideos = videoTv.results?.slice(startIndex, startIndex + videosPerPage); // Changed from detailsVideo to videoTv
    const totalPages = Math.ceil(videoTv.results.length / videosPerPage); // Changed from detailsVideo to videoTv

    return (
        <>
            <div className="my-[120px] px-4 flex flex-col">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-start md:text-xl xl:text-2xl">Total Video(s): {videoTv.results?.length}</h2> {/* Changed from detailsVideo to videoTv */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        showIcons
                        className="mb-2 p-0"
                    />
                </div>

                <h3 className="text-xl hover:underline cursor-pointer">Official Trailer</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6">
                    {
                        videoTv?.results?.filter(video => video.type === 'Trailer')?.map(item => ( // Changed from detailsVideo to videoTv
                            <div key={item.key} className="aspect-video overflow-clip hover:scale-105 group">
                                <iframe
                                    allowFullScreen // Fixed typo from allowFullScreennpm
                                    src={`https://www.youtube.com/embed/${item.key}`}
                                    className="w-full h-full rounded-xl"
                                    loading="lazy"
                                />
                                <p className="mt-2 text-start px-4 text-wrap group-hover:text-blue-500 text-ellipsis">{item.name}</p>
                            </div>
                        ))
                    }
                </div>

                <h3 className="text-xl mt-10 hover:underline cursor-pointer">Others</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6">
                    {
                        paginatedVideos?.map(item => (
                            <div key={item.key} className="aspect-video overflow-clip hover:scale-105 group">
                                <iframe
                                    allowFullScreen
                                    src={`https://www.youtube.com/embed/${item.key}`}
                                    className="w-full h-full rounded-xl"
                                    loading="lazy"
                                />
                                <p className="mt-2 text-start px-4 text-wrap group-hover:text-blue-500 text-ellipsis">{item.name}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    );
}