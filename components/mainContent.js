const MainContent = ({ children, col = "9", ...props }) => {
  return (
    <div className={`col-md-${col} px-0 main-content`} {...props}>
      {children}
    </div>
  );
};

export default MainContent;
