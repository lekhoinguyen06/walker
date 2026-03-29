import type { ConverseItem } from "@shared/chat.schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const baseURL = "https://s7joauy04a.execute-api.us-east-1.amazonaws.com/prod";

const client = axios.create({
	baseURL,
	headers: {
		"X-API-Key": import.meta.env.VITE_API_KEY,
	},
});

async function fetchChat(id: string): Promise<ConverseItem[]> {
	const response = await client.get(`/chat`);
	return response.data.data;
}

async function sendMessage(id: string, message: string) {
	const response = await client.post(`/chat`, {
		prompt: message,
	});
	return response.data.data;
}

async function deleteSession(id: string) {
	const response = await client.delete(`/chat`);
	return response.data.data;
}

export function useSession(id: string) {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ["chat", id],
		queryFn: () => fetchChat(id),
	});

	const sendMutation = useMutation({
		mutationFn: (message: string) => {
			console.log("Sending message:", message);
			return sendMessage(id, message);
		},
		onSuccess: (data) => {
			console.log("Send success:", data);
			queryClient.invalidateQueries({ queryKey: ["chat", id] });
		},
		onError: (error) => {
			console.error("Send error:", error);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteSession(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["chat"] });
		},
	});

	return {
		query,
		send: sendMutation.mutate,
		deleteSession: deleteMutation.mutate,
		isSending: sendMutation.isPending,
		isDeleting: deleteMutation.isPending,
	};
}
