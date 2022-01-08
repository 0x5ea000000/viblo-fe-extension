var data = [];

const EN_URL = 'https://gist.githubusercontent.com/manhhnv/82038950f4f636b20ec8267ac27f4a46/raw/d473e73f0cc110dd8d3d01d0a560763721617d3a/questions-en';
const VI_URL = 'https://gist.githubusercontent.com/manhhnv/82038950f4f636b20ec8267ac27f4a46/raw/d473e73f0cc110dd8d3d01d0a560763721617d3a/questions-vi';

async function getQuestions() {
    try {
        const extend = [{
            "id": 20952,
            "answer_id": 10444
        },
        {
            "id": 24916,
            "answer_id": 24914
        }]
        const [enRes, viRes] = await Promise.all([
            fetch(EN_URL, {
                headers: {
                    accept: 'application/json, text/plain, /',
                },
                method: 'GET',
            }),
            fetch(VI_URL, {
                headers: {
                    accept: 'application/json, text/plain, /',
                },
                method: 'GET',
            })
        ])
        const [enQuestions, viQuestions] = await Promise.all([enRes.json(), viRes.json()]);
        enQuestions?.length > 0 && data.push(...enQuestions);
        viQuestions?.length > 0 && data.push(...viQuestions);
        data.push(...extend);
    } catch (error) {
        console.log(error);
    }
}

async function checkResult() {
    try {
        if (data?.length === 0) {
            await getQuestions();
        }
        if (data?.length > 0) {
            const radios = document.querySelectorAll(".ant-radio-input");
            const answers = [];
            radios.forEach((radio) => {
                answers.push(String(radio.value))
            });
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const index = answers?.findIndex(el => el == String(element.answer_id));
                if (index !=  -1) {
                    const title = document.querySelector('.title-note');
                    if (title) {
                        title.innerHTML = `Chọn đáp án đúng: (correct answer: ${index + 1})`;
                    } else {
                        window.alert(`Correct answer is: ${index + 1}`)
                    }
                    break;
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementsByClassName("ant-radio-input")[0].onclick = async function (e) {
    document.querySelector('.title-note').innerHTML = 'Chọn đáp án đúng:';
    await checkResult()
}

document.getElementsByClassName("capitalize v-button v-button-primary v-button-large")[0].onclick = function (e) {
    document.querySelector('.title-note').innerHTML = 'Chọn đáp án đúng:';
    setTimeout(() => {
        document.getElementsByClassName("ant-radio-input")[0].onclick = async function (e) {
            checkResult().then(() => { })
        }
    }, 1000)
}

document.getElementsByClassName("capitalize v-button v-button-gray v-button-large")[0].onclick = function (e) {
    document.querySelector('.title-note').innerHTML = 'Chọn đáp án đúng:';
    setTimeout(() => {
        document.getElementsByClassName("ant-radio-input")[0].onclick = async function (e) {
            checkResult().then(() => { })
        }
    }, 1000)
}

document.querySelectorAll(".question-item").forEach((el) => el.onclick = function (e) {
    setTimeout(() => {
        document.getElementsByClassName("ant-radio-input")[0].onclick = async function (e) {
            document.querySelector('.title-note').innerHTML = 'Chọn đáp án đúng:';
            checkResult().then(() => { })
        }
    }, 1000)
})