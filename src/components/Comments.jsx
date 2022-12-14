import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Comments() {
  const [review, setReview] = useState({
    movie_title: "",
  });
  const [reviews, setReviews] = useState(null);

  const fetchReviews = async () => {
    const { data } = await axios.get("http://localhost:3001/reviews");
    setReviews(data);
  };

  const onSubmitHandler = (review) => {
    axios.post("http://localhost:3001/reviews", review);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Body>
      <Divleft
        onSubmit={(e) => {
          // ๐ submitํ์ ๋ ๋ธ๋ผ์ฐ์ ์ ์๋ก๊ณ ์นจ์ ๋ฐฉ์งํฉ๋๋ค.
          // e.preventDefault();
          onSubmitHandler(review);
        }}
      >
        <p>
          <h1>title</h1>
          <input
            type="text"
            onChange={(ev) => {
              const { value } = ev.target;
              setReview({
                ...review,
                movie_title: value,
              });
            }}
          />
        </p>
        <p>
          <h1> star </h1>
          <input
            type="text"
            onChange={(ev) => {
              const { value } = ev.target;
              setReview({
                ...review,
                star: value,
              });
            }}
          />
        </p>
        <p>
          <h1>contents</h1>
          <Textarea
            type="text"
            onChange={(ev) => {
              const { value } = ev.target;
              setReview({
                ...review,
                content: value,
              });
            }}
          />
        </p>
        <p>
          <button>์ถ๊ฐํ๊ธฐ</button>
        </p>
      </Divleft>
      <Divright>
        <p>
          <h1> image </h1>
          <input type="file" accept="image/*"></input>
          <Preimg></Preimg>
        </p>
      </Divright>
      <Divfoot>
        <h1>post2</h1>
        <div>
          {reviews?.map((review) => (
            <div key={review.id}>{review.movie_title}</div>
          ))}
        </div>
      </Divfoot>
    </Body>
  );
}

export default Comments;
