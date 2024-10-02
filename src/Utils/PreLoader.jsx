import React from 'react'
import Lottie from 'react-lottie';
import LoaderLottieAnimation from '../../public/Lotties/Animation - 1727248966926.json'

function PreLoader() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderLottieAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center'>

      <Lottie 
	    options={defaultOptions}
        height={100}
        width={100}
      />
      
    </div>
  )
}

export default PreLoader
