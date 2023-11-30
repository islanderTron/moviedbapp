export default function Admin() {
  async function onSubmit(formData: FormData) {
    'use server'
    console.log(formData);
  }

  
  return (
    <form action={onSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>

      <select className="select select-bordered w-full max-w-xs">
        <option disabled>Who shot first?</option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
    </form>
  );
}
