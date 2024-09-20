function BetaCard(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={props.style}
      className={`${props.className} bg-container-base rounded shadow-container`}
    >
      {props.children}
    </div>
  );
}

export default BetaCard;
