import Navbar from "@/app/components/navbar/page"

export default function Page({ params } : {params: {id: string}}) {
	
  return (
		<main>
			<Navbar />
			<p>{params.id}</p>
		</main>
  )
}