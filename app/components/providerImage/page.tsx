export default function ProviderImage({ imageURL, logo_path, provider_name}) {
  
  return (
    <img 
      className="mask mask-circle w-11 m-2"
      src={`${imageURL}/${logo_path}`} 
      alt={`${provider_name}`} 
    />
  );
}
