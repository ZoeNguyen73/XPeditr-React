import { useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useErrorHandler } from "../../context/ErrorHandlerProvider";

import storage from "../../utils/Storage";

const Quote = ({ containerStyles }) => {
  const { handleError } = useErrorHandler();
  const axiosPrivate = useAxiosPrivate();

  const [ quote, setQuote ] = useState("You can't crit without trying. Roll the dice.");

  // TO DO: activate useEffect once basic UI structure is done
  // useEffect(() => {
  //   const getQuote = async () => {
  //     try {
  //       const storedQuote = storage.getItem("daily-quote");
  //       if (!storedQuote ) {
  //         const response = await axiosPrivate.get("quotes/random");
  //         storage.setItem("daily-quote", response.data.text);
  //         setQuote(response.data.text);

  //       } else {
  //         setQuote(storedQuote);
  //       }
  //     } catch (error) {
  //       await handleError(error);
  //     }
  //   };

  //   getQuote();
  // }, [])

  return (
    <div className={containerStyles}>
      { quote && (
        <p className="text-center font-medium font-accent tracking-wider text-red text-lg">
          "{quote}"
        </p>
      )}
    </div>
  )
};

export default Quote;