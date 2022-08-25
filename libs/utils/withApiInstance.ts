import { API_ENDPOINT } from "@/libs/constants";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { NextApiRequest, NextApiResponse } from "next";

type WithApiInstanceHandler<T = any> = (
	api: ApiPromise,
	req: NextApiRequest,
	res: NextApiResponse<T>
) => unknown | Promise<unknown>;

export async function withApiInstance(handler: WithApiInstanceHandler) {
	const wsProvider = new WsProvider(API_ENDPOINT);
	const api = await ApiPromise.create({ provider: wsProvider });

	return function apiInstanceHandler(
		req: NextApiRequest,
		res: NextApiResponse
	) {
		return handler(api, req, res);
	};
}
