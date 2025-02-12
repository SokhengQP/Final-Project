import { useEffect } from "react"


export default function NowPlaying() {
     
     useEffect(() => { 
          document.title = 'Movie -- Now playing'
     }, []) 
     
     return (
          <>
               <div className="h-[200px] justify-around">
               </div>
          </>
     )
}