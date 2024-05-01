import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";

function Root() {
	return (
		<>
            <div className="content">
                <Navigation drawerWidth={240}>
                    <Outlet />
                </Navigation>
            </div>
        </>
	)
}

export default Root;