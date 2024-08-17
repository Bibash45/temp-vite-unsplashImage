import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { useGlobalContext } from "./context";

const Gallery = () => {
  const client_key = import.meta.env.VITE_API_KEY;
  const { search } = useGlobalContext();
  const URL = `https://api.unsplash.com/search/photos?client_id=${client_key}`;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["images", search],
    queryFn: async () => {
      const result = await axios.get(`${URL}&query=${search}`);
      return result.data.results;
    },
  });

  if (isLoading) {
    return (
      <section className="image-container">
        <h4>Loading....</h4>
      </section>
    );
  }
  if (isError) {
    return (
      <section className="image-container">
        <h4>There was an error:{error.message}</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {data.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            alt={item.alt_description}
            key={item.id}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
