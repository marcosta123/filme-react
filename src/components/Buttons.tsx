// ButtomMovie, ButtomTV
// src/components/Buttons.tsx
import "../Buttons.css";

type ButtonProps = {
  text: string;
  variant?: "primary" |  "secondary";
  onClick?:() => void;
}

function Button({ text, variant, onClick}: ButtonProps) {
  return(
    <button className={`media-switch media-switch-${variant}`}
    onClick={onClick}
    >{text}</button>
  );
}

export default Button;
