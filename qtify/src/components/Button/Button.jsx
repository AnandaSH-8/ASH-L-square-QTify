import Button from "@mui/material/Button";
import styles from "./Button.module.css";

const ReButton = ({ text }) => {
  return (
    <Button variant="contained" className={styles.buttonStyle}>
      {text}
    </Button>
  );
};

export default ReButton;
