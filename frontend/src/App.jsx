import { useAtom } from "jotai";
import { themeAtom } from "./store/jotai";
import Router from "./router/router";

function App() {
    const [theme, ] = useAtom(themeAtom);

	return (
		<div className={`relative wh-full ${theme}`}>
			<Router />
		</div>
	);
}

export default App;
