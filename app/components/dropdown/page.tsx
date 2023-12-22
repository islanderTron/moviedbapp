export default function Page() {
  return (
<details className="dropdown">
  <summary className="btn m-1">Category</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 overflow-y-auto">
        <li><a className="link" href={`/genre/28`}>Action</a></li>
        <li><a href={`/genre/12`}>Adventure</a></li>
        <li><a href={`/genre/16`}>Animation</a></li>
        <li><a href={`/genre/35`}>Comedy</a></li>
        <li><a href={`/genre/80`}>Crime</a></li>
        <li><a href={`/genre/99`}>Documentary</a></li>
        <li><a href={`/genre/18`}>Drama</a></li>
        <li><a href={`/genre/10751`}>Family</a></li>
        <li><a href={`/genre/14`}>Fantasy</a></li>
        <li><a href={`/genre/36`}>History</a></li>
        <li><a href={`/genre/27`}>Horror</a></li>
        <li><a href={`/genre/10402`}>Music</a></li>
        <li><a href={`/genre/9648`}>Mystery</a></li>
        <li><a href={`/genre/10749`}>Romance</a></li>
        <li><a href={`/genre/878`}>Science Fiction</a></li>
        <li><a href={`/genre/10778`}>TV Moive</a></li>
        <li><a href={`/genre/53`}>Thriller</a></li>
        <li><a href={`/genre/37`}>Western</a></li>
      </ul>
    </details>
  )
}