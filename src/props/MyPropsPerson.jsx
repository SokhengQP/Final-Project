
import { useState } from "react";

export function MyPropsPerson({ name, profile, departments, overviews }) {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className="flex gap-6 relative h-[300px] group">
            <img
                className={`hover:scale-105 absolute rounded-[50%] left-2/4 top-6 w-[150px] -translate-x-2/4 -translate-y-2/4 sm:rounded-3xl sm:w-[50%] sm:h-[60%] object-cover md:left-12 md:top-2/4 md:-translate-y-2/4 md:w-[200px]  md:rounded-3xl aspect-square  ${!isLoaded ? 'blur-xl' : ''}`}
                src={profile}
                alt={name}
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsLoaded(true)}
                
            />
            <div className="border-l-0 flex flex-col items-center justify-start p-8 rounded-3xl gap-2 md:justify-center md:items-start dark:border-white border-black m-0 md:ml-20 px-6 w-[100%] text-white bg-[rgba(0,0,0,0.86)] dark:text-[black] dark:bg-[#ffffffdf] ">
                <div className="m-0 md:ml-24 w-fit text-2xl font-bold mt-20 sm:mt-0">
                    <p className="">{name}</p>
                    <p className="font-semibold">{departments}</p>
                </div>
                <p className="md:ml-24 text-sm line-clamp-5 ">{overviews}</p>
                {/* <Link to={`/to-persons/${id}-${name?.toLowerCase().replace(/\s+/g, "-")}`}>Profile</Link> */}
            </div>
        </div>
    );
}