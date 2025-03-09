import { useDispatch, useSelector } from "react-redux"
import { fetchPopularTv } from "../../features/tv-actions/tvAction"
import { useEffect } from "react";


export default function PopularTv() {

     const dispatch = useDispatch();
     const { popularTv } = useSelector(state => state.myTvs);

     useEffect(() => {
          dispatch(fetchPopularTv());
     }, [])

     console.log(popularTv.results?.map(nice => nice.id));
     
     return (
          <>
               <div className="my-[120px]">
                    <p>Popular Tv</p>
               </div>
          </>
     )
}