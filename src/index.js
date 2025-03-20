function displayQuote(response) {
    const quoteElement = document.querySelector("#quote");
    const fullQuote = response.data.answer;

    const [quoteText, attribution] = fullQuote.split("—");

    let cleanQuote = quoteText.trim().replace(/^["“”']+|["“”']+$/g, "");

    new Typewriter("#quote", {
        strings: `<span class="quote-text">“${cleanQuote}”</span><br><span class="quote-attribution">— ${attribution?.trim()}</span>`,
        autoStart: true,
        cursor: "",
        delay: 3,
    });
}

function findQuote(event) {
    event.preventDefault();

    const topicInput = document.querySelector("#topic");
    const quoteElement = document.querySelector("#quote");
    const topic = topicInput.value.trim();

    const apiKey = `b705eo34c0t383f4dcafe061a0034b5c`;
    const context = `Give me a meaningful quote with full attribution. After the quote, add a long dash (—) followed by a space, then the author's full name, birth–death years in parentheses, nationality (as adjective), and what they are known for. The quote must be verifiably attributed to that person.`;
    const prompt = `Tell me a quote about ${topic}`;
    const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    quoteElement.classList.remove("hidden");
    quoteElement.innerHTML = `
  <div class="searching">
    <img src="src/images/icon-loading.svg" class="rotating loading-icon" alt="Loading icon" />
    Searching for a quote about <strong>${topic}</strong>...
  </div>
`;

    axios.get(apiUrl).then(displayQuote);
}

let quoteFormElement = document.querySelector("#quote-explorer-form");
quoteFormElement.addEventListener("submit", findQuote);
