import React from 'react';
import Particles from 'react-tsparticles';
import { loadStarsPreset } from 'tsparticles-preset-stars';

const StarBackground = () => {
  const particlesInit = async (engine) => {
    await loadStarsPreset(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'stars',
        background: {
          color: '#000010',
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
      }}
    />
  );
};

export default StarBackground;
