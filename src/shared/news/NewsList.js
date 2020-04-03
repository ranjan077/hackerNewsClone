import React, {useState} from "react";
import Post from './Post';
import "./NewsList.css";

export default React.memo(function NewsList({ news }) {
  return (
    <div className="newslist">
      {news &&
        news.filter(post => post.title).map((post, index) =>
          <Post post={post} index={index} key={post.objectID}/>
        )}
    </div>
  );
});
