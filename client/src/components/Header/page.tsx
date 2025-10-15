"use client";

type Props = {
  name: string;
  buttonComponent?: React.ReactNode;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold text-gray-900 transition-colors dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent && <div>{buttonComponent}</div>}
    </div>
  );
};

export default Header;
