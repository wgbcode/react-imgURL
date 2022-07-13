import "./importAll";

const Icon = ({ name }) => {
  return (
    <svg>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};
export default Icon;
