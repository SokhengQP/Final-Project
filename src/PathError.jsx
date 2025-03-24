import { Link } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
export default function PathError() {
     return (
          <>
               <div className="relative top-0 left-0 h-screen">
                    <Link to='/' className="absolute left-2 top-2 flex items-center justify-center rounded-md bg-[#0d1b2a] hover:bg-[#0d1b2ac0] active:bg-[#163352] px-2 group">
                         <IoIosArrowRoundBack size='35px' className="group-hover:-translate-x-1 text-white" />
                         <h2 className="text-white">Back Homepage</h2>
                    </Link>
                    <h2 className="flex justify-center text-5xl text-blackp py-4 text-black">Page doesn't exist</h2>
                    <img className="absolute w-full h-full -z-10 top-0 left-0" src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?t=st=1741158257~exp=1741161857~hmac=8158290e3a86468f81c1182abbd6b47e49ed655f785afa0f559de0ade069439d&w=1380" alt="" />
               </div>
          </>

     )
}