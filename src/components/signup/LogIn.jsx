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
                    .required("Required"),
               email: Yup.string()
                    .email('Invalid email address!')
                    .required("Required")
          }),
     });


     return (
          <>
               <form
                    // onSubmit will get handleSubmit
                    onSubmit={formik.handleSubmit}
               >
                    <input
                         onChange={formik.handleChange}
                         value={formik.values.email}
                         id="email"
                         name="email"
                         type="email"
                    />
                    {formik.touched.email && formik.touched.email ? <div className="text-red-500">{formik.errors.email}</div> : null}

                    <input
                         onChange={formik.handleChange}
                         value={formik.values.password}
                         id="password"
                         name="password"
                         type="password" />

                    {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                    <button type="submit">Log in</button>
               </form>

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

