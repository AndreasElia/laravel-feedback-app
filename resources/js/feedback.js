require('./bootstrap');

import * as Pico from '@gripeless/pico';

const Form = {
    template: `
        <form role="form">
            <textarea placeholder="Feedback goes here"></textarea>
            <button type="submit">Submit</button>
            <button type="button">Screenshot</button>
        </form>
    `
}

const Feedback = {
    data() {
        return {
            key: '',
            message: 'todo',
            submitted: false
        };
    },
    mounted() {
        this.initKey();
        this.createForm();
    },
    methods: {
        initKey() {
            const allScripts = document.getElementsByTagName('script')

            for (let i = 0; i < allScripts.length; i++) {
                const currentScript = allScriptTags[i]

                if (!currentScript.src.includes('api.feedbacksaloon.com')) {
                    continue;
                }

                this.key = currentScript.getAttribute('src').match(/\?key=(.*)$/)
            }
        },
        createForm() {
            // document requests, etc.?
        },
        async takeScreenshot() {
            const screenshot = (await Pico.dataURL(window, {})).value;
            console.log(screenshot);
            return screenshot;
        },
        submit() {
            axios.post('https://api.feedbacksaloon.com/feedback', this.message)
                .then((response) => {
                    this.submitted = true;
                })
                .catch((err) => {
                    this.submitted = false;
                });
        }
    }
}

Vue.createApp(Feedback);
