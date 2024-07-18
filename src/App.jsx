import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function App() {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [color, setColor] = useState("");
  const [isError, setIsError] = useState("");

  const getRandomQuote = (quoteArray) => {
    const randomId = Math.floor(Math.random() * quoteArray.length);
    return quoteArray[randomId];
  };

  const getRandomColor = () => {
    const colorPanel = ["red", "blue", "orange", "green", "purple", "brown"];
    const randomNumber = Math.floor(Math.random() * colorPanel.length);
    return colorPanel[randomNumber];
  };
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setAllQuotes(data);
        setQuote(getRandomQuote(data));
        setColor(getRandomColor());
      })
      .catch((error) => setIsError(error));
  }, []);

  const handleClick = () => {
    setQuote(getRandomQuote(allQuotes));
    setColor(getRandomColor());
  };

  return (
    <>
      {isError ? (
        <p>Oops! Something went wrong...</p>
      ) : (
        <div className={color}>
          <div className={`back`}>
            <article className="card" id="quote-box">
              <header className="card__header">
                <blockquote className="quote" id="text">
                  <FontAwesomeIcon icon={faQuoteLeft} /> {quote.text}
                </blockquote>
                <h1 className="author" id="author">
                  - {quote.author}
                </h1>
              </header>

              <footer className="card__footer">
                <ul className="links">
                  <li className="links__item">
                    <a
                      className="btn btn--link"
                      href="twitter.com/intent/tweet"
                      target="_blank"
                      id="tweet-quote"
                    >
                      <FontAwesomeIcon icon={faTwitter} aria-hidden="true" />
                      <span className="hidden">Visit our twitter</span>
                    </a>
                  </li>
                  <li className="links__item">
                    <a className="btn btn--link" href="#" target="_blank">
                      <FontAwesomeIcon icon={faTumblr} aria-hidden="true" />
                      <span className="hidden">Visit our tumblr</span>
                    </a>
                  </li>
                  <li className="links__item">
                    <button
                      className="btn"
                      id="new-quote"
                      onClick={handleClick}
                    >
                      New quote
                    </button>
                  </li>
                </ul>
              </footer>
            </article>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
