import { useFormik } from "formik";
import Particles from "../../styles/Particles"
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../features/auths/authAction";
import { useNavigate } from "react-router";


const ParticleMemo = React.memo(Particles);
export default function LogIn() {
     // create formik for handle form data login
     // submit, change, blur

     const navigate = useNavigate();
     const dispatch = useDispatch();

     const formik = useFormik({
          initialValues: {
               email: '',
               password: '',
          },

          onSubmit: (value) => {
               dispatch(signUp(value))
               navigate(`/`);
          },

          validationSchema: Yup.object({
               password: Yup.string()
                    .min(6, "Must be 6 characters up!")
                    .max(15, "Must be 20 characters or less")
                    .required(<p>Required</p>),
               email: Yup.string()
                    .email('Invalid email address!')
                    .required(<p>Required</p>),
          }),
     });


     return (
          <>

               <div class="flex justify-center items-center top-0 left-0 relative h-screen">
                    <div class="absolute animate-spin  rounded-[40%] border-4 h-[500px] w-[500px] border-purple-500 shadow-[0_0_10px_purple]">
                    </div>
                    <div class="absolute animate-spin1 rounded-[40%] border-4 h-[500px] w-[500px] border-orange-500  shadow-[0_0_10px_orange] ml-2">
                    </div>
                    <div class="absolute animate-spin2 rounded-[40%] border-4 h-[500px] w-[500px] border-green-500 shadow-[0_0_10px_green] ml-2"></div><div class="absolute animate-spin3 rounded-[40%] border-4 h-[500px] w-[500px] border-blue-500 shadow-[0_0_10px_blue] ml-2"></div><div class="z-10 flex flex-col items-center gap-4"><div class="flex gap-8 flex-col w-[300px] "><div class="flex items-center justify-around">
                         <img id="logo" class="aspect-square opacity-75 h-28 w-28 rounded-3xl" src="https://cdn.pixabay.com/photo/2017/01/31/23/42/animal-2028258_1280.png" alt="FoxMovie" />
                         <h2 class="text-3xl px-4 text-wrap"><span class="text-nowrap text-2xl">Welcome to</span>
                              <br />
                              <span class="text-nowrap font-[800]">Fox Movie</span></h2>
                    </div>
                    </div>
                         <form
                              // onSubmit will get handleSubmit
                              onSubmit={formik.handleSubmit}
                              className="flex flex-col gap-2"
                         >
                              <p className="font-extrabold">Email</p>
                              <section className="relative">
                                   <input
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="rounded-xl bg-transparent border-2"
                                        placeholder="Email"
                                   />
                                   {formik.touched.email && formik.touched.email ? <div className="absolute left-3 top-0 px-2 text-sm dark:bg-[#1E1E1E] bg-[#EFEFEC] text-red-500 z-50 -translate-y-2/4 rounded-md font-bold">{formik.errors.email}</div> : null}
                              </section>

                              <p className="font-extrabold">Password</p>
                              <section className="relative">
                                   <input
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="rounded-xl bg-transparent border-2"
                                        placeholder="Password"
                                   />
                                   {formik.touched.password && formik.errors.password ? <div className="absolute left-3 top-0 px-2 text-sm dark:bg-[#1E1E1E] bg-[#EFEFEC] text-red-500 z-50 -translate-y-2/4 rounded-md font-bold">{formik.errors.password}</div> : null}
                              </section>

                              <button type="submit" className="rounded-xl mt-10 py-2 bg-[#3B82F6]">Log in</button>
                         </form>
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

