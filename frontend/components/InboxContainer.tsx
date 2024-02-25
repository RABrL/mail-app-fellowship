"use client";
import { useEffect, type ReactElement, useState } from "react";
import { InboxCard } from "./InboxCard";
import { Email } from "../types/EmailInterface";
import { getEmailsByUser } from "@/services/getEmails";

export function InboxContainer(): ReactElement {
	const [emails, setEmails] = useState<Email[]>([]);
  
	useEffect(() => {
		const fetchEmails = async () => {
			try {
				const res = await getEmailsByUser(1);
				const emails = res?.data;
				if (!emails || emails.length === 0) return;
				setEmails(emails);
			} catch (error) {
				console.error(error);
			}
		};
		fetchEmails();
	}, []);

	return (
		<section className="w-1/4 min-w-96 overflow-y-scroll">
			{emails.map((email, index) => (
				<InboxCard key={email.mail_id} {...email} />
			))}
		</section>
	);
}
