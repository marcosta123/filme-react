// ButtomMovie, ButtomTV
// src/components/Buttons.tsx
import "../Buttons.css";

type ButtonProps = {
  text: string;
  variant?: "primary" |  "secondary";
};

function Button({ text, variant}: ButtonProps) {
  return(
    <button className={`media-switch media-switch-${variant}`}>{text}</button>
  );
}

export default Button;
