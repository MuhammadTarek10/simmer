import Lottie from 'react-lottie'
import loadingLottie from '../../../../resources/loading.json'

const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: loadingLottie
        }}
        height={800}
        width={800}
      />
    </div>
  )
}
export default Loading
