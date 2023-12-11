export default function Video({ id }) {
  // Issue with iFrame - need to do some research
  // think download react-embed may solve many unusual errors. 
  // https://www.npmjs.com/package/react-embed
  const embedUrl = `https://www.youtube.com/embed/6HVP4t7eJPw?si=VKXrR8jihBr_nGJQ`;
  return (
    <iframe
      // width='100%'
      // height='200px'
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>

    // <iframe
    //   width="560"
    //   height="315"
    //   src="https://www.youtube.com/embed/6HVP4t7eJPw?si=VKXrR8jihBr_nGJQ"
    //   title="YouTube video player"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    // ></iframe>
  );
}
