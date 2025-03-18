

export function MyPropsPerson({ name, profile, departments, overviews }) {
    return (
        <div className="flex gap-6 relative h-[300px] group ">
            <img
                className={`hover:scale-105 absolute -left-10 top-2/4 -translate-y-2/4  h-56 rounded-3xl object-cover aspect-square`}
                src={profile}
                alt={name}
            />
            <div className="border-l-0 flex flex-col justify-center rounded-3xl gap-4 dark:border-white border-black border ml-20 px-6 w-[100%] bg-[rgba(239,239,236,0.4)] dark:bg-[var(--accent-hover)]">
                <div>
                    <p className="ml-24 w-fit text-2xl font-bold">{name}</p>
                    <p className="ml-24 w-fit text-md font-semibold text-nowrap">{departments}</p>
                </div>
                <p className="dark:text-gray-200 text-gray-800  ml-24 text-sm line-clamp-3">{overviews}</p>
            </div>
        </div>

    );
}