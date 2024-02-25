import { ReactElement, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Email } from "@/types/EmailInterface";
import { tailwindColors } from "@/utils/randomColors";

export function InboxCard(props: Email) {
	// busca el parametro de la ruta de la url
	const pathname = usePathname();
	const id = Number(pathname.match(/[\d]/));
	const [cardColor] = useState(
		tailwindColors[Math.floor(Math.random() * tailwindColors.length)],
	);

	return (
		<Link href={`/${props.mail_id}`}>
			<article
				className={`${
					id === props.mail_id && "bg-opacity-95 border-l-4 border-l-button"
				} bg-secondary cursor-pointer border-b border-b-gray-500 flex text-slate-50  px-8 py-8 items-center `}
			>
				<div
					className={` ${cardColor} flex justify-center items-center rounded-full w-14 h-12`}
				>
					<h2 className=" text-2xl ">{props.sender_email?.slice(0, 1)}</h2>
				</div>
				<div className="w-full  ">
					<p className="text-right text-xs text-gray-400">
						{props.sent_date.slice(0, 10)}
					</p>
					<div className=" ml-5">
						<h3 className="font-semibold leading-tight">
							{props.sender_email}
						</h3>
						<p className="text-gray-300 text-xs leading-tight">
							{props.subject}
						</p>
					</div>
				</div>
			</article>
		</Link>
	);
}
