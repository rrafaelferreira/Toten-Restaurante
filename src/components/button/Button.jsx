import "./button.css";

// Adicionei 'disabled' aqui nas props
function Button({ text, onClick, type, disabled }) {
  return (
    <button
      className={`custom-button ${type || ""}`}
      onClick={onClick}
      disabled={disabled} // Aplica o estado de desabilitado ao botão real
    >
      {text}
    </button>
  );
}

export default Button;










// import "./button.css";

// function Button({ text, onClick, type }) {
//   return (
//     <button
//       className={`custom-button ${type || ""}`}
//       onClick={onClick}
//     >
//       {text}
//     </button>
//   );
// }

// export default Button;