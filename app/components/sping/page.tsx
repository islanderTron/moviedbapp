export default function Spin(props) {
  return (
    <div
      className={`flex items-center justify-center ${
        props["h-screen" ?? "h-screen"]
      }`}
    >
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
