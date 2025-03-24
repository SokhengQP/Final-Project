import { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPeople, fetchSearchPeople } from "../../features/people/peopleAction";
import { setPage } from "../../features/people/peopleSlice";
import { Link } from "react-router";
import { MyPropsPerson } from "../../props/MyPropsPerson";
import { Pagination } from "flowbite-react";
import { faces, fallbackImg } from '../../utility';
import { useDebounce } from 'use-debounce';
import { MdPersonSearch } from "react-icons/md";


export default function PopularPeople() {
     const dispatch = useDispatch();
     const { popularPerson, searchResults, page, loading, error } = useSelector(state => state.people);
     const [query, setQuery] = useState('');
     const [debouncedQuery] = useDebounce(query, 500); // Debounce query with 500ms delay
     
     const totalPages = searchResults && query ? (searchResults?.total_pages || 1) : (popularPerson?.total_pages || 1);
     const displayData = searchResults && query ? searchResults : popularPerson;

     useEffect(() => {
          document.title = `Fox Movie - Popular People`;
          dispatch(fetchPopularPeople(page));
     }, [dispatch, page]);

     useEffect(() => {
          if (debouncedQuery.trim()) {
               dispatch(fetchSearchPeople({ query: debouncedQuery, page }));
          }
     }, [dispatch, debouncedQuery, page]);

     const handleSearch = () => {
          if (query.trim()) {
               dispatch(fetchSearchPeople({ query, page }));
          } else {
               dispatch(fetchPopularPeople(page));
          }
     };

     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));
          if (query) {
               dispatch(fetchSearchPeople({ query, page: newPage }));
          } else {
               dispatch(fetchPopularPeople(newPage));
          }
     };

     return (
          <>
               <div>
                    <h1 className="2xl:text-2xl mt-[120px] text-center">Popular People</h1>
                    <form
                         className="flex items-center max-w-lg mx-auto z-10 my-2"
                         onSubmit={(e) => e.preventDefault()}
                    >
                         <div className="relative w-full">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                   <MdPersonSearch />
                              </div>
                              <input
                                   value={query}
                                   onChange={(e) => setQuery(e.target.value)}
                                   type="text"
                                   id="voice-search"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search your popular person..."
                              />
                         </div>
                         <button
                              onClick={() => handleSearch(query)}
                              type="submit"
                              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                         >
                              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                              </svg>
                              Search
                         </button>
                    </form>
                    
                    <Pagination
                         currentPage={page}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                         showIcons
                         className="mb-2 p-0 flex justify-center md:justify-end"
                    />

                    <section className="grid grid-cols-1 xl:grid-cols-2 gap-20 px-8 md:px-16 pt-12 md:pt-4">
                         {loading ? (
                              <p className="col-span-2 text-center text-lg text-gray-400 ">Loading...</p>
                         ) : error ? (
                              <p className="col-span-2 text-center text-lg text-red-500">Error: {error}</p>
                         ) : displayData?.results?.length > 0 ? (
                              displayData.results.map((person) => {
                                   const { id, name, profile_path, known_for } = person;
                                   return (
                                        <Link
                                             id="element"
                                             to={`/to-persons/${id}-${name?.toLowerCase().replace(/\s+/g, "-")}`}
                                             key={id}
                                             className="cursor-pointer"
                                        >
                                             <MyPropsPerson
                                                  name={name || "N/A"}
                                                  profile={profile_path ? `${faces}${profile_path}` : fallbackImg}
                                                  overviews={known_for?.map(txts => txts?.overview)}
                                             />
                                        </Link>
                                   );
                              })
                         ) : (
                              <p className="col-span-2 text-center text-lg text-gray-400">
                                   {query ? "No matching people found" : "No popular people found"}
                              </p>
                         )}
                    </section>
               </div>


          </>
     );
}