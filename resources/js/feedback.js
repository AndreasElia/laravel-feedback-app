require('./bootstrap')

// import * as Pico from '@gripeless/pico'
import html2canvas from 'html2canvas'
import { createApp } from 'vue'

const feedbackElement = document.createElement('div')
feedbackElement.id = 'feedback'
document.body.appendChild(feedbackElement)

const Form = {
    props: {
        apiKey: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            form: {
                message: '',
                screenshot: ''
            }
        }
    },
    template: `
        <form
            class="bg-white rounded-lg p-5 fixed right-5 bottom-16"
            @submit.prevent="submit"
        >
            <textarea v-model="form.message" placeholder="Feedback goes here"></textarea>
            <div class="mt-2 flex justify-between space-x-2">
                <button
                    class="bg-blue-100 rounded-lg p-2 flex-1 text-sm"
                    type="submit"
                >Submit</button>

                <button
                    class="bg-gray-100 rounded-lg p-2 flex-1 text-sm"
                    @click="screenshot"
                    type="button"
                >Screenshot</button>
            </div>
        </form>
    `,
    methods: {
        async screenshot() {
            // const screenshot = (await Pico.dataURL(window, {})).value

            html2canvas(document.querySelector('body')).then(canvas => {
                this.form.screenshot = canvas.toDataURL()
            })
        },
        submit() {
            const apiKey = this.apiKey

            axios.post(`http://feedback-app.test:8000/api/feedback?key=${apiKey}`, this.form)
                .then((response) => {
                    alert('done')
                })
                .catch((err) => {
                    alert('err')
                })
        }
    }
}

createApp({
    components: {
        Form
    },
    data() {
        return {
            apiKey: '',
            enabled: false
        }
    },
    template: `
        <Form :apiKey="apiKey" v-if="enabled" />

        <button
            class="fixed bottom-5 right-5 bg-black hover:bg-opacity-75 focus:bg-opacity-75 text-white rounded-lg px-4 py-2 focus:outline-none"
            @click="enabled = !enabled"
            type="button"
        >
            Feedback
        </button>
    `,
    mounted() {
        this.apiKey = this.getApiKey()
    },
    methods: {
        getApiKey() {
            const allScripts = document.getElementsByTagName('script')
            let key = ''

            for (let i = 0; i < allScripts.length; i++) {
                if (!allScripts[i].src.includes('feedback-app.test')) continue

                key = allScripts[i].getAttribute('src').match(/\?key=(.*)$/)
            }

            return key[0].substring(5)
        }
    }
}).mount('#feedback')
