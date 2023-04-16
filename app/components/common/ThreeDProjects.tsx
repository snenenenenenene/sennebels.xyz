import { FaLongArrowAltRight } from "react-icons/fa";

export const ThreeDProjects = ({
  image,
  title,
  year,
  className,
  setThreeDHoverPath,
  handleProjectHover,
  isHovered,
  index,
}: {
  image: string;
  title: string;
  year: string;
  className?: string;
  setThreeDHoverPath: any;
  handleProjectHover?: any;
  isHovered?: boolean;
  index?: number;
}) => {
  return (
    <div
      onMouseEnter={() => {
        setThreeDHoverPath(image);
        handleProjectHover(index);
      }}
      onMouseLeave={() => {
        handleProjectHover(null);
      }}
      className={`${className} ${
        isHovered ? "opacity-100" : "opacity-60"
      } border-t md:h-20 duration-200 transition-all cursor-pointer sm:h-20 h-14 border-light-tertiary flex items-center sm:pl-20 pl-4`}
    >
      <p className="sm:text-base text-xs">{year}</p>
      <p className="uppercase md:ml-24 xs:ml-20 ml-10 text-sm sm:text-xl">
        {title}
      </p>
      <FaLongArrowAltRight className="ml-auto mr-2" />
    </div>
  );
};
