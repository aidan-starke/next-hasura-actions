import { NextApiRequest, NextApiResponse } from "next";
import { execute, getApiInstance } from "@/libs/utils";
import { API_ENDPOINT, GET_FULL_BLOCK } from "@/libs/constants";

export default async function getFullBlock(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const api = await getApiInstance(API_ENDPOINT);
	try {
		const { id } = req.body.input;

		const { data, errors } = await execute(GET_FULL_BLOCK, {
			id,
		});
		if (errors) return res.status(400).json(errors[0]);

		const header = await api.derive.chain.getHeader(data.app_blocks_by_pk.hash);

		return res.json({
			...data.app_blocks_by_pk,
			validator: header?.author?.toString(),
		});
	} catch (error: any) {
		return res.status(400).json({
			message: error.message,
		});
	}
}
