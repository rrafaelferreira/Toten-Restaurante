import "./button.css";

function Button({ text, onClick, type, disabled }) {
  return (
    <button
      /* Se type for "back", a classe será "custom-button back" */
      className={`custom-button ${type || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;











// import "./button.css";

// // Adicionei 'disabled' aqui nas props
// function Button({ text, onClick, type, disabled }) {
//   return (
//     <button
//       className={`custom-button ${type || ""}`}
//       onClick={onClick}
//       disabled={disabled} // Aplica o estado de desabilitado ao botão real
//     >
//       {text}
//     </button>
//   );
// }

// export default Button;