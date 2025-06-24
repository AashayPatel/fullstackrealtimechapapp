const ChatLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="relative w-40 h-24 animate-diamond-rotate">
        <div className="ball ball-1" />
        <div className="ball ball-2" />
        <div className="ball ball-3" />
        <div className="ball ball-4" />
      </div>

      <style>{`
        .ball {
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          background-color: #0b63f3 ;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
        }

        .ball-1 {
          animation: anim1 1s infinite ease-in-out;
        }

        .ball-2 {
          animation: anim2 1s infinite ease-in-out;
        }

        .ball-3 {
          animation: anim3 1s infinite ease-in-out;
        }

        .ball-4 {
          animation: anim4 1s infinite ease-in-out;
        }

        .animate-diamond-rotate {
          animation: rotate-diamond 1s infinite ease-in-out;
        }

        @keyframes rotate-diamond {
          0%, 59% {
            transform: rotate(0deg);
          }
          60% {
            transform: rotate(0deg);
          }
          70% {
            transform: rotate(45deg);
          }
          80% {
            transform: rotate(45deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes anim1 {
          0% {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
          25% {
            transform: translate(-120%, -50%);
            opacity: 1;
          }
          50% {
            transform: translate(-120%, -120%);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes anim2 {
          0% {
            opacity: 0;
          }
          25% {
            transform: translate(20%, -50%);
            opacity: 1;
          }
          50% {
            transform: translate(20%, -120%);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes anim3 {
          0%, 40% {
            opacity: 0;
          }
          50% {
            transform: translate(-120%, 20%);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes anim4 {
          0%, 40% {
            opacity: 0;
          }
          50% {
            transform: translate(20%, 20%);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default ChatLoader
