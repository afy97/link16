import { Provider } from "react-redux"
import { Canvas } from "./components/Link16"
import store from "./redux/store"

const App = () => {
    return (
        <Provider store={store}>
            <Canvas />
        </Provider>
    )
}

export default App
