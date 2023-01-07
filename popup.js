const text = document.getElementById("text");
const summarySubmitBtn = document.getElementById("summarySubmit");
const answerSubmitBtn = document.getElementById("answerSubmit");
const result = document.getElementById("result");

const token = "";

async function getSummary(search) {

    let data = {
        "inputs": search,
        "wait_for_model": true
    };

    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    const res = await response.json();
    console.log(res);
    result.innerHTML = res[0].summary_text;
}

async function getAnswer(search, context) {
    let data = {
        "inputs": {
            "question": search,
            "context": context
        }
    };

    const response = await fetch(
        "https://api-inference.huggingface.co/models/huggingface-course/bert-finetuned-squad",
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const res = await response.json();
    return res;
}

function getDOM() {
    return document.body.innerText;
}

async function getTab() {
    let tab = await chrome.tabs.query({ active: true });
    return tab[0];
}

let body = "";

getBody();

async function getBody() {
    let tab = await getTab();
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: getDOM,
        args: []
    }, (result) => {
        body = result[0].result;
    });
}

summarySubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    result.innerHTML = 'Loading...';
    getSummary(text.value);
});

answerSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    result.innerHTML = 'Loading...';
    let res = await getAnswer(text.value, body);
    let answer = res.answer;
    result.innerHTML = answer;
});
