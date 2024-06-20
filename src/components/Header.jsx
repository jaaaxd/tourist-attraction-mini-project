function Header(props) {
  return (
    <>
      <h1
        className="main-title"
        onClick={() => {
          props.setSearchInput("");
        }}
      >
        เที่ยวไหนดี
      </h1>
      <div className="search-box">
        <p className="search-label">ค้นหาที่เที่ยว</p>
        <input
          name="search"
          type="text"
          value={props.searchInput}
          onChange={(event) => {
            props.setSearchInput(event.target.value);
          }}
        />
      </div>
      <div className="section">
        <div className="section-message">หาที่เที่ยวแล้วไปกัน ...</div>
        <div className="result-count">Results ({props.posts.length})</div>
      </div>
    </>
  );
}

export default Header;
