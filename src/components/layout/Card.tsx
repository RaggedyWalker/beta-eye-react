function BetaCard(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = '' } = props;
  return (
    <div
      style={props.style}
      className={`${className} betaui-card bg-container-base rounded shadow-container`}
    >
      {props.children}
    </div>
  );
}

export default BetaCard;
