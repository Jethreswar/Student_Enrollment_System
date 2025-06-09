const ColorLine = ({ color, width, height }) => {
  return (
    <hr
      style={{
        color: { color },
        backgroundColor: { color },
        height: { height },
        width: { width },
      }}
    />
  );
};

export default ColorLine;