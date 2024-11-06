const Badge = ({ counts }) => {
  return (
    <span className='pt-4 pr-6 absolute  right-0 top-8 bottom-0  font-semibold block text-center'>
      {counts}
    </span>
  );
};

export default Badge;
