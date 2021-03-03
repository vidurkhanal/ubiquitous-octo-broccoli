import { Navbar } from "./Navbar";
import { Wrapper, WrapperVariants } from "./Wrapper";

interface LayoutProps {
  variant: WrapperVariants;
}

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
