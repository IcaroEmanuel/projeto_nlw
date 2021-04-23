import { http } from "./http"
import { } from "./websocket/client"

http.listen(3333, () => console.log("Server is running on port 3333"));