import { useEffect } from "react";
import Footer from "../../components/Footer";
import Unavbar from "../../components/Unavbar";
import { useNavigate, Link } from "react-router-dom";

const Uhome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, []);

  const bestsellerBooks = [
    {
      title: "RICH DAD POOR DAD",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1524451661i/39924789.jpg",
    },
    {
      title: "THINK AND GROW RICH",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg",
    },
    {
      title: "DON'T LET HER STAY",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1674147285i/80830635.jpg",
    },
    {
      title: "KILLING THE WITCHES",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675642559i/65214203.jpg",
    },
  ];

  const topRecommendations = [
    {
      title: "HARRY POTTER",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1663805647i/136251.jpg",
    },
    {
      title: "ELON MUSK",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692288251i/122765395.jpg",
    },
    {
      title: "THE MOSQUITO",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1544102229i/42983957.jpg",
    },
    {
      title: "JOURNEY ON THE JAMES",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347493537i/1979210.jpg",
    },
  ];

  return (
    <>
      <div className="bg-green-50 min-h-screen text-green-900 font-serif">
        <Unavbar />

        {/* Best Seller Section */}
        <section className="my-12 px-4 md:px-6 lg:px-12">
          <h1 className="text-center text-3xl sm:text-4xl font-bold mb-8 text-green-700">
            Best Sellers
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {bestsellerBooks.map((book, index) => (
              <Link
                key={index}
                to="/uproducts"
                className="w-full max-w-xs bg-green-100 rounded-2xl border border-green-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-72 sm:h-80 object-cover rounded-t-2xl"
                />
                <div className="p-4 text-center font-semibold text-green-900">
                  {book.title}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Recommendations */}
        <section className="my-20 px-4 md:px-6 lg:px-12">
          <h1 className="text-center text-3xl sm:text-4xl font-bold mb-8 text-green-700">
            Top Recommendations
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {topRecommendations.map((book, index) => (
              <Link
                key={index}
                to="/uproducts"
                className="w-full max-w-xs bg-green-100 rounded-2xl border border-green-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-72 sm:h-80 object-cover rounded-t-2xl"
                />
                <div className="p-4 text-center font-semibold text-green-900">
                  {book.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Uhome;
