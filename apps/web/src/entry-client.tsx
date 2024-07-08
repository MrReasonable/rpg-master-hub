// @refresh reload
import { mount, StartClient } from '@solidjs/start/client'

const app = document.getElementById('app')

if (app === null) {
    console.log("No app element found, can't mount the app")
} else {
    mount(() => <StartClient />, app)
}
