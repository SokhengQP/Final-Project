import { Link } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import ErrorImg from './source-image/ErrorPath.png'

export default function PathError() {
     return (
          <>
               <div className="relative w-full h-screen">
                    <Link to='/' className="absolute left-2 top-2 flex items-center justify-center rounded-md bg-[#0d1b2a] hover:bg-[#0d1b2ac0] active:bg-[#163352] px-2 group">
                         <IoIosArrowRoundBack size='35px' className="group-hover:-translate-x-1 text-white" />
                         <h2 className="text-white">Back Homepage</h2>
                    </Link>
                    <img className="flex items-center justify-center" src={'https://i.pinimg.com/736x/fd/d2/a1/fdd2a13b962bd304f81a03e22d5e992c.jpg'} alt="" />
               </div>
          </>

     )
}