export default function Admin() {
  async function onSubmit(formData: FormData) {
    'use server'
    console.log(formData);
  }

  
  return (
    <form action={onSubmit}>
      <input type="text" name="name" />

      <select className="select select-bordered w-full max-w-xs" name="sort">
        <option value='popularity.asc'> popularity </option>
        <option value='popularity.desc'> popularity </option>
        <option value='revenue.asc'> revenue </option>
        <option value='revenue.desc'> revenue </option>
        <option value='primary_release_date.asc'> primary_release_date </option>
        <option value='primary_release_date.desc'> primary_release_date </option>
        <option value='vote_average.asc'> vote_average </option>
        <option value='vote_average.desc'> vote_average </option>
        <option value='vote_count.asc'> vote_count </option>
        <option value='vote_count.desc'> vote_count </option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
