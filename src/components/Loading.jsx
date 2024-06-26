import React from 'react';
import logoUg from '../resource/img/LogosUG.png';
import { BeatLoader } from 'react-spinners';
const Loading = () => {
  const estilo = {
    display:'flex',
    flexDirection:'column',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  };
   return (
    <div style={estilo}>
      <style>
        {`
        @keyframes parpadeo {
          0% { opacity: 0.8; }
          50% { opacity: 0; }
          100% { opacity: 0.8; }
        }
      `}
      </style>
      <img
        src={logoUg}
        alt="parpadeo"
        style={{
            
          width: '150px',
          animation: 'parpadeo 1.5s infinite',
        }}
      />
      <BeatLoader
        color="rgba(12, 154, 204, 1)"
        margin={5}
        size={20}
        />
    </div>
  );
};

export default Loading;
