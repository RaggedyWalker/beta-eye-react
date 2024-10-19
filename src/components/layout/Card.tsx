function BetaCard(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = '' } = props;
  return (
    <div
      style={props.style}
      className={`betaui-card rounded bg-container-base shadow-container ${className} `}
    >
      {props.children}
    </div>
  );
}

export default BetaCard;
