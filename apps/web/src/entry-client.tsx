// @refresh reload
import { mount, StartClient } from '@solidjs/start/client'

const app = document.querySelector('#app')

if (app === null) {
    console.log("No app element found, can't mount the app")
} else {
    mount(() => <StartClient />, app)
}
