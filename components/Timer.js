const Displayer = ({ count }) => {
  const prefixZero = (num) => `${num < 10 ? "0" : ""}${num}`;

  return (
    <>
      <div>
        <span>{prefixZero(Math.floor(count / 60))}</span> :{" "}
        <span>{prefixZero(count % 60)}</span>
      </div>

      {/* Styles */}
      <style jsx>{`
        span {
          display: inline-block;
          border: none;
          color: ${count === 0 ? "black" : "#1976d2"};
          margin-left: 0.5ch;
          padding: 0;
          width: 3ch;
          background: repeating-linear-gradient(
              90deg,
              dimgrey 0,
              dimgrey 1ch,
              transparent 0,
              transparent 1.5ch
            )
            0 100%/ 10ch 2px no-repeat;
          font: 5rem "DM Mono", monospace;
          letter-spacing: 0.5ch;
        }

        div {
          display: inline-flex;
          align-items: center;
          font: 3rem "DM Mono", monospace;
          margin: 50px 0;
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default function Timer({ count }) {
  return <Displayer count={count} />;
}
