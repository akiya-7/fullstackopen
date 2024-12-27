interface alertProps {
  alertMessage: string;
}

const Alert = ({alertMessage}: alertProps) => {

  return (
    <p style={{color: "red"}}>{alertMessage}</p>
  )
}

export default Alert;