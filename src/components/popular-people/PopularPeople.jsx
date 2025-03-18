import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPeople } from "../../features/people/peopleAction";
import { setPage } from "../../features/people/peopleSlice";
import { Link } from "react-router";
import { MyPropsPerson } from "../../props/MyPropsPerson";
import { Pagination } from "flowbite-react";
import { url, empty } from '../../utility'

export default function PopularPeople() {

     // const colorThief = new window.ColorThief();
     let dispatch = useDispatch();
     const { popularPerson, page } = useSelector(state => state.people);
     const totalPages = popularPerson?.total_pages || 1;

     useEffect(() => {
          document.title = `Fox Movie - Popular People`;
          dispatch(fetchPopularPeople(page));
     }, [page]);


     const handlePageChange = (newPage) => {
          dispatch(setPage(newPage));
     };


     return (
          <>
               <div className="my-[120px]">
                    <div className="flex gap-4 justify-between items-center w-full px-16 my-4">
                         <h1 className="text-base md:text-xl xl:text-2xl">Popular People</h1>
                         <Pagination
                              currentPage={page}
                              totalPages={totalPages}
                              onPageChange={handlePageChange}
                              showIcons
                              className="mb-2 p-0"
                         />
                    </div>

                    <section className="grid grid-cols-2 gap-32 px-16">
                         {
                              popularPerson?.results?.length > 0 ? (
                                   popularPerson.results?.map((person) => {
                                        const { id, name, profile_path, known_for } = person;
                                        return (
                                             <Link id="element" to={`/to-persons/${id}-${name?.toLowerCase().replace(/\s+/g, "-")}`} key={id} className="cursor-pointer">
                                                  <MyPropsPerson
                                                       name={"@" + name || "N/A"}
                                                       profile={profile_path ? `${url}${profile_path}` : empty}
                                                       overviews={known_for?.map(txts => txts?.overview)}
                                                  />
                                             </Link>
                                        );
                                   })
                              ) : (
                                   <p className="col-span-5 text-center text-lg text-gray-400">No popular people found.</p>
                              )}

                    </section>

               </div>


          </>
     );
}