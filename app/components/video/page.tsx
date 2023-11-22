export default function Video() {
  // Issue with iFrame - need to do some research 
  let id = '2deV7cUtS0E'
  return (
    <iframe 
      src={`https://www.youtube.com/watch?v=${id}`}
      title="Test"
      allow="autoplay"
      ></iframe>
  )
}