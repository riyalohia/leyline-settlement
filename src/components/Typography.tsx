import React, { ReactNode } from "react";

const Typography = ({ children, className }: { children: ReactNode, className: string }) => {
	return (
		<h2 className={`text-2xl leading-snug tracking-tight text-gray-800 ${className} lg:leading-tight`}>{children}</h2>
	)
}

export default Typography