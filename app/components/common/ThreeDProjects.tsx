export const ThreeDProjects = ({
  image,
  title,
  year,
  setThreeDHoverPath,
}: {
  image: string;
  title: string;
  year: string;
  setThreeDHoverPath: any;
}) => {
  return (
    <div
      onMouseEnter={() => {
        setThreeDHoverPath(image);
      }}
      className="border-t md:h-20 cursor-pointer sm:h-20 h-14 border-light-tertiary flex items-center sm:pl-20 pl-4"
    >
      <p className="sm:text-base text-xs">{year}</p>
      <p className="uppercase md:ml-24 xs:ml-20 ml-10 text-sm sm:text-xl">
        {title}
      </p>
    </div>
  );
};
