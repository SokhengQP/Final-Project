import Particles from "../../styles/Particles"
import React from 'react';


const ParticleMemo = React.memo(Particles);
export default function LogIn() {
     return (
          <>
               <div className="flex justify-center items-center top-0 left-0 relative h-screen">
                    <div className="absolute animate-spin  rounded-[40%] border-4 h-[500px] w-[500px] border-purple-500 shadow-[0_0_10px_purple]" />
                    <div className="absolute animate-spin1 rounded-[40%] border-4 h-[500px] w-[500px] border-orange-500  shadow-[0_0_10px_orange] ml-2" />
                    <div className="absolute animate-spin2 rounded-[40%] border-4 h-[500px] w-[500px] border-green-500 shadow-[0_0_10px_green] ml-2" />
                    <div className="absolute animate-spin3 rounded-[40%] border-4 h-[500px] w-[500px] border-blue-500 shadow-[0_0_10px_blue] ml-2" />

                    <div className="z-10 flex flex-col items-center gap-4">
                         <div className="flex gap-8 flex-col w-[300px] ">

                              <div className="flex items-center justify-around">
                                   <img id="logo" className="aspect-square opacity-75 h-28 w-28 rounded-3xl" src="https://cdn.pixabay.com/photo/2017/01/31/23/42/animal-2028258_1280.png" alt="FoxMovie" />
                                   <h2 className="text-3xl px-4 text-wrap">
                                        <span className="text-nowrap text-2xl">Welcome to </span>
                                        <br />
                                        <span className="text-nowrap font-[800]">Fox Movie</span>
                                   </h2>
                              </div>





                         </div>

                         <button className="border-2 border-green-500 w-[100px] p-2 flex rounded-md justify-center">Submit</button>
                    </div>
               </div>

               <div style={{ width: '100%', height: '100%', position: 'fixed', left: '0', top: '0', zIndex: '-9999' }}>
                    <ParticleMemo
                         particleColors={['#ffffff', '#ffffff']}
                         particleCount={200}
                         particleSpread={10}
                         speed={0.1}
                         particleBaseSize={50}
                         moveParticlesOnHover={true}
                         alphaParticles={false}
                         disableRotation={false}
                    />
               </div>
          </>
     )
}

