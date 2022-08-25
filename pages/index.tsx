import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<div className="p-8 w-screen h-screen">
			<div className="w-2/3 m-auto">
				<h1 className="text-2xl tracking-wide text-center">
					Testing Hasura Actions with NextJS
				</h1>
			</div>
		</div>
	);
};

export default Home;
