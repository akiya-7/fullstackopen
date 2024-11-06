import { useSelector } from "react-redux";

const AlertMessage = () => {
  const styleMap = {
    success: {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    error: {
      color: "red",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    default: {},
  };

  const alert = useSelector((state) => state.alert);

  if (alert.message === null || alert.type === null) {
    return null;
  }

  const alertStyle = styleMap[alert.type] || styleMap.default;

  return <div style={alertStyle}>{alert.message}</div>;
};

export default AlertMessage;
