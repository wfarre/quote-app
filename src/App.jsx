import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function App() {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    console.log(color);
  }, [color]);

  const handleClick = () => {
    setQuote(getRandomQuote(allQuotes));
    setColor(getRandomColor());
  };

  return (
    <>
      <div className={color}>
        <div className={`back `}>
          <figure className="card" id="quote-box">
            <header className="card__header">
              <blockquote className="quote" id="text">
                <FontAwesomeIcon icon={faQuoteLeft} /> {quote.text}
              </blockquote>
              <figcaption className="author" id="author">
                - {quote.author}
              </figcaption>
            </header>

            <footer className="card__footer">
              <ul className="links">
                <li className="links__item">
                  <a className="btn btn--link">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li className="links__item">
                  <a className="btn btn--link">
                    <FontAwesomeIcon icon={faTumblr} />
                  </a>
                </li>
                <li className="links__item">
                  <button className="btn" id="new-quote" onClick={handleClick}>
                    New quote
                  </button>
                </li>
              </ul>
            </footer>
          </figure>
        </div>
      </div>
    </>
  );
}

export default App;
