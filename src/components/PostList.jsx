import { useState } from "react";

function PostList(props) {
  const [showCopyPopup, setShowCopyPopUp] = useState(false);
  const characterLimit = (content) => {
    const maxChars = 120;
    return content.length > maxChars
      ? content.substring(0, maxChars) + " ... "
      : content;
  };

  const additionalPhotos = (photos) => {
    const photosExceptFirst = [...photos];
    photosExceptFirst.shift();
    return photosExceptFirst.map((item, index) => {
      return <img key={index} src={item} />;
    });
  };

  const categoryRender = (tags) => {
    const tagsExceptLast = [...tags];
    const lastTag = tagsExceptLast.pop();

    const handleTagClick = (tag) => {
      if (props.searchInput.includes(tag)) {
        return;
      } else {
        props.setSearchInput(
          props.searchInput ? `${props.searchInput} ${tag}` : tag
        );
      }
    };

    return (
      <ul>
        {tagsExceptLast.map((item, index) => (
          <li
            onClick={() => {
              handleTagClick(item);
            }}
            key={index}
          >
            {item}
          </li>
        ))}
        และ
        <li
          onClick={() => {
            handleTagClick(lastTag);
          }}
        >
          {lastTag}
        </li>
      </ul>
    );
  };

  return (
    <div className="post-list">
      {props.posts.map((post, index) => {
        const handleShareClick = () => {
          navigator.clipboard.writeText(post.url);
          setShowCopyPopUp(true);
          setTimeout(() => {
            setShowCopyPopUp(false);
          }, 1000);
        };

        return (
          <div className="post-item" key={index}>
            <img className="main-image" src={post.photos[0]} />
            <div className="post-details">
              <h4
                className="post-title"
                onClick={() => {
                  window.open(post.url, "_blank");
                }}
              >
                {post.title}
              </h4>
              <p className="post-desc" id="post-desc">
                {characterLimit(post.description)}
                <a href={post.url} target="_blank">
                  อ่านต่อ
                </a>
              </p>
              <div className="category">หมวด {categoryRender(post.tags)}</div>
              <div className="post-footer">
                <div className="additional-photo">
                  {additionalPhotos(post.photos)}
                </div>
                <img
                  className="share-button"
                  src="https://cdn-icons-png.freepik.com/512/6994/6994770.png"
                  onClick={handleShareClick}
                  alt="copy to clipboard"
                />
              </div>
            </div>
          </div>
        );
      })}
      {showCopyPopup && <div className="copy">Copied to clipboard!</div>}
    </div>
  );
}

export default PostList;
