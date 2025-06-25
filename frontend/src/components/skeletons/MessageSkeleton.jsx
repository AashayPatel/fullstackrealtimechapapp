const MessageSkeleton = ({ count = 6 }) => {
  const skeletonMessages = Array(count).fill(null);
  const bubbleWidths = ["w-[180px]", "w-[220px]", "w-[160px]"]; // Different bubble widths
  const messageHeights = ["h-12", "h-16", "h-20"]; // Different message heights

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-8">
      {skeletonMessages.map((_, idx) => {
        const isStart = idx % 2 === 0;
        const randomBubbleWidth = bubbleWidths[Math.floor(Math.random() * bubbleWidths.length)];
        const randomMessageHeight = messageHeights[Math.floor(Math.random() * messageHeights.length)];

        return (
          <div
            key={idx}
            className={`flex items-start gap-3 ${isStart ? "justify-start" : "justify-end"}`}
          >
            {/* Avatar Skeleton - Left */}
            {isStart && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            )}

            <div className={`space-y-2 ${isStart ? "items-start" : "items-end"}`}>
              {/* Header Skeleton - Only show for received messages */}
                <div className="bg-gray-500 dark:bg-gray-600 rounded-tr-none animate-pulse" />
              

              {/* Message Bubble Skeleton */}
              <div
                className={`${randomBubbleWidth} ${randomMessageHeight} rounded-2xl ${
                  "bg-gray-500 dark:bg-gray-600 rounded-tr-none"
                } animate-pulse`}
              />
            </div>

            {/* Avatar Skeleton - Right */}
            {!isStart && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton; 