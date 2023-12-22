import Link from "next/link";

export default function Page() {
  return (
    <details className="dropdown">
      <summary className="m-1 btn">Categories</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <Link href={`/genre/28`}><li><a>Action</a></li></Link>
        <Link href={`/genre/12`}><li><a>Adventure</a></li></Link>
        <Link href={`/genre/16`}><li><a>Animation</a></li></Link>
        <Link href={`/genre/35`}><li><a>Comedy</a></li></Link>
        <Link href={`/genre/80`}><li><a>Crime</a></li></Link>
        <Link href={`/genre/99`}><li><a>Documentary</a></li></Link>
        <Link href={`/genre/18`}><li><a>Drama</a></li></Link>
        <Link href={`/genre/10751`}><li><a>Family</a></li></Link>
        <Link href={`/genre/14`}><li><a>Fantasy</a></li></Link>
        <Link href={`/genre/36`}><li><a>History</a></li></Link>
        <Link href={`/genre/27`}><li><a>Horror</a></li></Link>
        <Link href={`/genre/10402`}><li><a>Music</a></li></Link>
        <Link href={`/genre/9648`}><li><a>Mystery</a></li></Link>
        <Link href={`/genre/10749`}><li><a>Romance</a></li></Link>
        <Link href={`/genre/878`}><li><a>Science Fiction</a></li></Link>
        <Link href={`/genre/10778`}><li><a>TV Moive</a></li></Link>
        <Link href={`/genre/53`}><li><a>Thriller</a></li></Link>
        <Link href={`/genre/37`}><li><a>Western</a></li></Link>
      </ul>
    </details>
  )
}