import { NextApiRequest, NextApiResponse } from "next";
import { execute, getApiInstance } from "@/libs/utils";
import { API_ENDPOINT, GET_BLOCK_WITH_VALIDATOR } from "@/libs/constants";

export default async function getBlockWithValidator(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const api = await getApiInstance(API_ENDPOINT);

		const { blockHash } = req.body.input;

		const header = await api.derive.chain.getHeader(blockHash);

		const { data, errors } = await execute(GET_BLOCK_WITH_VALIDATOR, {
			blockHash,
		});
		if (errors) return res.status(400).json(errors[0]);

		return res.json({
			...data.app_blocks[0],
			validator: header?.author?.toString(),
		});
	} catch (error: any) {
		return res.status(400).json({
			message: error.message,
		});
	}
}
