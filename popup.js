const text = document.getElementById("text");
const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("result");

const token = "";

async function query(search) {

    let data = {
        "inputs":search,
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
    result.innerHTML = res[0].summary_text;
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    query(text.value);
});
