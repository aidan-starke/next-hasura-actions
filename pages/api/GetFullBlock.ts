import { ApiPromise } from "@polkadot/api";
import { GET_FULL_BLOCK } from "@/libs/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { execute, withApiInstance } from "@/libs/utils";

export default withApiInstance(async function getFullBlock(
	api: ApiPromise,
	req: NextApiRequest,
	res: NextApiResponse
) {
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
});
