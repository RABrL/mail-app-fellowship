import { Email } from "@/types";
import axios from "axios";

export const getEmailsByUser = async (userEmail: string) => {

	return await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/mail/received/${userEmail}`,
	).then((res) => {
		return res.json();
	});
};
export const getEmailsSent = async (userEmail: string) => {
	try {
		return await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/mail/sent/${userEmail}`,
		);
	} catch (error) {
		console.error(error);
	}
};
export const getAnEmail = async (
	mailId: number,
): Promise<Email | undefined> => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/mail/information/${mailId}`,
		);
		if (!res.data) return undefined;
		return res.data;
	} catch (error) {
		console.error();
	}
};
