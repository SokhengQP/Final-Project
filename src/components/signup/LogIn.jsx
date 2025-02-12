export default function LogIn() {
     return (
          <>
               
               <div className="flex flex-col items-center gap-4 fixed left-0 top-0 h-screen w-screen">
                    <img className="-z-10 w-full h-full" src="https://cdn.pixabay.com/photo/2023/01/01/18/34/abstract-7690589_1280.jpg" alt="" />
               
                    <a href="/">Home</a>
                    <div className="absolute top-52 flex flex-col gap-8">
                         
                    <img className="aspect-square h-24 w-24 rounded-[50%]
                         [filter:drop-shadow(0_0_10px_#03071e)_drop-shadow(0_0_5px_#0077b6)_drop-shadow(0_0_5px_#ecf39e)_drop-shadow(0_0_5px_#ffb703)]" src="https://cdn.pixabay.com/photo/2017/01/31/23/42/animal-2028258_1280.png" alt="fox-movie" />
                         
                         <div className="flex flex-col">
                              <label htmlFor="">Gmail</label>
                              <input type="text" className="w-[260px] h-[40px] rounded-3xl bg-transparent border px-6 outline-none" />
                         </div>
                    </div>
                    
               </div>
               
               
               
          </>
     )
}