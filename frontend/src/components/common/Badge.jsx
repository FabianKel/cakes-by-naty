const Badge = ({ counts }) => {
  return (
    <span className='absolute -top-2 -right-2 min-w-4 h-4 px-1.5
      sm:min-w-5 sm:h-5 sm:px-2
      bg-red-500 rounded-full 
      text-[10px] sm:text-xs text-white font-bold
      flex items-center justify-center'>
      {counts}
    </span>
  );
};

export default Badge;
