const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Geometric/Crystalline animated background */}
      <div className="absolute inset-0">
        {/* SVG Pattern with animated paths */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="stop-blue-200 dark:stop-gray-700" />
              <stop offset="50%" className="stop-purple-200 dark:stop-gray-600" />
              <stop offset="100%" className="stop-pink-200 dark:stop-gray-800" />
            </linearGradient>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="stop-cyan-200 dark:stop-gray-600" />
              <stop offset="100%" className="stop-indigo-200 dark:stop-gray-700" />
            </linearGradient>
          </defs>
          
          {/* Animated geometric shapes */}
          <g className="animate-float-slow" opacity="0.3">
            <polygon 
              points="10,20 30,5 50,20 40,40 20,40" 
              fill="url(#grad1)"
              className="animate-morph"
            />
            <polygon 
              points="60,10 85,15 80,35 65,45 55,30" 
              fill="url(#grad2)"
              className="animate-morph-delay-1"
            />
            <polygon 
              points="15,60 25,50 45,55 40,75 20,80" 
              fill="url(#grad1)"
              className="animate-morph-delay-2"
            />
            <polygon 
              points="70,60 90,55 95,75 85,90 65,85" 
              fill="url(#grad2)"
              className="animate-morph-delay-3"
            />
          </g>
          
          {/* Connecting lines */}
          <g className="animate-pulse-slow" opacity="0.2">
            <line x1="25" y1="25" x2="70" y2="25" stroke="url(#grad1)" strokeWidth="0.5" className="animate-draw" />
            <line x1="70" y1="25" x2="75" y2="65" stroke="url(#grad2)" strokeWidth="0.5" className="animate-draw-delay-1" />
            <line x1="30" y1="65" x2="75" y2="65" stroke="url(#grad1)" strokeWidth="0.5" className="animate-draw-delay-2" />
            <line x1="25" y1="25" x2="30" y2="65" stroke="url(#grad2)" strokeWidth="0.5" className="animate-draw-delay-3" />
          </g>
        </svg>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white dark:bg-gray-400 rounded-full animate-float particle-${i + 1}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-blue-300/20 to-transparent dark:from-gray-600/20 rounded-full animate-pulse-glow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-radial from-purple-300/20 to-transparent dark:from-gray-500/20 rounded-full animate-pulse-glow-delay"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-gradient-radial from-pink-300/15 to-transparent dark:from-gray-700/15 rounded-full animate-pulse-glow-slow"></div>
      </div>
      
      {/* Glass/Crystal effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20"></div>
    </div>
  );
};

export default AnimatedBackground;
