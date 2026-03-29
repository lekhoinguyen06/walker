import { useSession } from "./useSession";
import { Chatbox } from "../ui/Chatbox";
import { ChatUISchema } from "@shared/chat.schema";
import LinearProgress from "@mui/material/LinearProgress";

interface SessionProps {
	id: string;
}

export default function Session({ id }: SessionProps) {
	const { query } = useSession(id);
	const { isPending, isError, data, error } = query;

	if (isPending)
		return (
			<div className="h-120">
				<LinearProgress />
			</div>
		);
	if (isError)
		return (
			<div className="h-120">
				<div>Error: {error?.message}</div>;
			</div>
		);

	const messages = ChatUISchema.safeParse(
		data.map((message, index) => ({
			...message,
			id: String(index + 1),
			type: "message",
		})),
	);

	console.log("Messages: " + JSON.stringify(messages));

	return (
		<div className="flex h-120 items-center ">
			<Chatbox messages={messages.data ?? []} />
		</div>
	);
}
