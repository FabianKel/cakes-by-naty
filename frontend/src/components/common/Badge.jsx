const Badge = ({ counts }) => {
  return (
    <span className='pr-6 absolute  right-0 top-6 bottom-0  font-semibold block text-center'>{counts}</span>
  );
};

export default Badge;
