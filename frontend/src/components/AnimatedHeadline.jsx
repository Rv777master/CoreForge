/**
 * Splits text into words and animates them in one after another
 * on mount — a cinematic "typewriter reveal" without an actual typewriter.
 * Wrap the emphasized part in {highlight} to render it in the accent color.
 */
function AnimatedHeadline({ text, highlight }) {
  const words = text.split(" ");

  return (
    <h1>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-reveal"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
      {highlight && (
        <span
          className="word-reveal"
          style={{ animationDelay: `${words.length * 70}ms` }}
        >
          <span className="accent-highlight">{highlight}</span>
        </span>
      )}
    </h1>
  );
}

export default AnimatedHeadline;
