require('./bootstrap')

import * as Vue from 'vue'
import * as Pico from '@gripeless/pico'

const hostname = 'api.feedback.com'

const feedbackElement = document.createElement('div')
feedbackElement.id = 'feedback'
document.body.appendChild(feedbackElement)

const Form = {
    data() {
        return {
            message: ''
        }
    },
    template: `
        <form role="form">
            <textarea v-model="message" placeholder="Feedback goes here"></textarea>
            <button type="submit">Submit</button>
            <button type="button">Screenshot</button>
        </form>
    `
}

Vue.createApp({
    data() {
        return {
            key: ''
        }
    },
    mounted() {
        this.key = this.getKey()
    },
    template: `<Form />`,
    methods: {
        getKey() {
            const allScripts = document.getElementsByTagName('script')
            let key = ''

            for (let i = 0; i < allScripts.length; i++) {
                if (!allScripts[i].src.includes(hostname)) continue

                key = allScripts[i].getAttribute('src').match(/\?key=(.*)$/)
            }
console.log(key)
            return key
        },
        async takeScreenshot() {
            const screenshot = (await Pico.dataURL(window, {})).value
            console.log(screenshot)
            return screenshot
        },
        submit() {
            axios.post(`https://${hostname}/feedback`, this.message)
                .then((response) => {
                    this.submitted = true
                })
                .catch((err) => {
                    this.submitted = false
                })
        }
    }
}).mount('#feedback')
