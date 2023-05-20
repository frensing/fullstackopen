const Notification = ({ message }) => {
  const baseStyle = {
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const styles = {
    info: {
      ...baseStyle,
      color: "green",
    },
    warn: {
      ...baseStyle,
      color: "yellow",
    },
    error: {
      ...baseStyle,
      color: "red",
    },
  };

  if (message === null) {
    return null;
  }

  return <div style={styles[message.type]}>{message.text}</div>;
};

export default Notification;
