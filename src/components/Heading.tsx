import React from "react";

const Heading = ({ title }: { title: string }) => {
	return (
		<p className="text-2xl leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tigh text-center">
			{title}
		</p>
	)
}

export default Heading