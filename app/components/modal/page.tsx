export default function Modal({ movie, imageURL }) {
	return (
	<dialog id={`${movie.id}`} className="modal modal-top">
		<div className="modal-box w-1/2 align-middle">
			<h3 className="font-bold text-lg">Hello!</h3>
			<p className="py-4">Click the button below to close</p>
			<div className="modal-action">
				<form method="dialog">
					{/* if there is a button, it will close the modal */}
					<button className="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>
	)
}