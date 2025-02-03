import { motion } from "framer-motion";

export function Equalizer({isPlaying}) {
    const bars = [
        { delay: 0, height: ["30%", "100%", "60%", "120%", "30%"] },
        { delay: 0.2, height: ["60%", "120%", "30%", "100%", "60%"] },
        { delay: 0.4, height: ["100%", "60%", "120%", "30%", "100%"] },
      ];
    
      return (
        <div className="flex space-x-1 items-end w-6 h-6">
          {bars.map((bar, index) => (
            <motion.div
              key={index}
              className="w-1.5 bg-cyan-500 rounded-sm"
              animate={{
                height: isPlaying ? bar.height : "30%",
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: bar.delay,
              }}
            />
          ))}
        </div>
      );
}
