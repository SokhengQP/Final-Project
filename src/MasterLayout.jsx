import Particles from './styles/Particles.jsx';
import Header from './components/header/Header'
import { Outlet } from "react-router";
import Footer from './components/header/Footer.jsx';
import React from 'react';

export default function MasterLayout() {
     const HeaderMemo = React.memo(Header);
     const FooterMemo = React.memo(Footer);
     const ParticlesMemo = React.memo(Particles);
     return (
          <>
               <HeaderMemo />

               <div style={{ width: '100%', height: '100%', position: 'fixed', left: '0', top: '0', zIndex: '-9999' }}>
                    <ParticlesMemo
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
               <Outlet />
               <FooterMemo />
          </>
     );
}



