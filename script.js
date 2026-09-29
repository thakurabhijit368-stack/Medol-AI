/* =========================================
   MEDOL AI
   DESENDER
   ========================================= */


/* APP STATE */

let currentMode = "chat";


/* DOM */

const input = document.getElementById("userInput");
const chatArea = document.getElementById("chatArea");
const welcome = document.getElementById("welcome");
const modeLabel = document.getElementById("modeLabel");
const sidebar = document.getElementById("sidebar");


/* MODES */

const modes = {

    chat: {
        name: "MEDOL AI",
        placeholder: "Message MEDOL..."
    },

    code: {
        name: "MEDOL CODE",
        placeholder: "Describe the code you want to build..."
    },

    student: {
        name: "MEDOL STUDENT",
        placeholder: "Ask a question or paste your problem..."
    },

    image: {
        name: "MEDOL IMAGE",
        placeholder: "Describe the image you want to create..."
    }

};


/* CHANGE MODE */

function setMode(mode) {

    currentMode = mode;

    modeLabel.textContent = modes[mode].name;

    input.placeholder = modes[mode].placeholder;

    input.focus();

}


/* SEND MESSAGE */

function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    if (welcome) {
        welcome.style.display = "none";
    }

    addMessage(text, "user");

    input.value = "";

    input.style.height = "auto";

    showThinking();

    setTimeout(() => {

        removeThinking();

        const response = generateDemoResponse(text);

        addMessage(response, "ai");

        saveHistory(text);

    }, 700);

}


/* ENTER */

function handleEnter(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendMessage();

    }

}


/* ADD MESSAGE */

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    const avatar = document.createElement("div");

    avatar.className = "avatar";

    avatar.textContent =
        type === "user" ? "👤" : "M";


    const content = document.createElement("div");

    content.className = "message-content";

    content.textContent = text;


    message.appendChild(avatar);

    message.appendChild(content);

    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;

}


/* THINKING */

function showThinking() {

    const thinking = document.createElement("div");

    thinking.className = "message ai";

    thinking.id = "thinking";

    thinking.innerHTML = `
        <div class="avatar">M</div>
        <div class="message-content">
            MEDOL is thinking...
        </div>
    `;

    chatArea.appendChild(thinking);

    chatArea.scrollTop = chatArea.scrollHeight;

}


function removeThinking() {

    const thinking =
        document.getElementById("thinking");

    if (thinking) {
        thinking.remove();
    }

}


/* DEMO AI RESPONSE */

function generateDemoResponse(text) {

    const lower = text.toLowerCase();


    /* IMAGE */

    if (
        currentMode === "image" ||
        lower.includes("create an image") ||
        lower.includes("generate an image")
    ) {

        return `🎨 MEDOL Image Creator

Your image request:

"${text}"

A real image-generation backend can be connected here.

Suggested image prompt:

Create a high-quality cinematic image based on the user's description. Use detailed lighting, realistic textures, strong composition, professional photography, and high resolution.`;


    }


    /* CODE */

    if (
        currentMode === "code" ||
        lower.includes("html") ||
        lower.includes("javascript") ||
        lower.includes("css") ||
        lower.includes("code")
    ) {

        return `💻 MEDOL Code Helper

I can help you build this.

For example, a basic HTML page starts like this:

<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>

    <h1>Hello from MEDOL</h1>

</body>
</html>

For a real AI coding assistant, connect this interface to your AI backend/API.`;


    }


    /* STUDENT */

    if (
        currentMode === "student" ||
        lower.includes("homework") ||
        lower.includes("math") ||
        lower.includes("student")
    ) {

        return `🎓 MEDOL Student Helper

I can explain school topics step by step.

Question received:

${text}

A real AI backend can analyze the question and provide an explanation, examples, and practice questions.

For exams and assessments, use MEDOL as a learning tool and follow your school's rules.`;


    }


    /* DEFAULT */

    return `🤖 Hello! I'm MEDOL, an AI assistant created for DESENDER.

You asked:

"${text}"

This demo interface is ready for a real AI backend.

Once you connect an AI API, MEDOL can generate much more advanced answers, explanations, code, summaries and other content.`;

}


/* QUICK PROMPT */

function quickPrompt(text) {

    input.value = text;

    sendMessage();

}


/* NEW CHAT */

function newChat() {

    chatArea.innerHTML = "";

    chatArea.appendChild(createWelcome());

    input.value = "";

    setMode("chat");

}


/* CREATE WELCOME */

function createWelcome() {

    const div = document.createElement("div");

    div.className = "welcome";

    div.innerHTML = `
        <div class="big-logo">M</div>

        <h1>What can I help you with?</h1>

        <p>
            Ask MEDOL anything — learn, code,
            create, write and explore.
        </p>

        <div class="quick-actions">

            <button onclick="quickPrompt('Help me learn HTML step by step')">
                💻
                <span>
                    <strong>Learn coding</strong>
                    <small>HTML, CSS & JavaScript</small>
                </span>
            </button>

            <button onclick="setMode('student')">
                🎓
                <span>
                    <strong>Study with MEDOL</strong>
                    <small>Understand difficult topics</small>
                </span>
            </button>

            <button onclick="setMode('image')">
                🎨
                <span>
                    <strong>Create an image</strong>
                    <small>Describe your image</small>
                </span>
            </button>

            <button onclick="setMode('code')">
                🧑‍💻
                <span>
                    <strong>Build something</strong>
                    <small>Get coding help</small>
                </span>
            </button>

        </div>
    `;

    return div;

}


/* HISTORY */

function saveHistory(text) {

    const history =
        document.getElementById("history");

    const item =
        document.createElement("div");

    item.className = "history-item";

    item.textContent = text;

    history.prepend(item);

}


/* SIDEBAR */

function toggleSidebar() {

    sidebar.classList.toggle("open");

}


/* SETTINGS */

function openSettings() {

    document
        .getElementById("settingsModal")
        .classList.add("show");

}


function closeSettings() {

    document
        .getElementById("settingsModal")
        .classList.remove("show");

}


/* THEME */

function changeTheme(theme) {

    if (theme === "light") {

        document.documentElement.style.setProperty(
            "--bg",
            "#f5f5f5"
        );

        document.documentElement.style.setProperty(
            "--sidebar",
            "#ffffff"
        );

        document.documentElement.style.setProperty(
            "--panel",
            "#eeeeee"
        );

        document.documentElement.style.setProperty(
            "--panel2",
            "#e4e4e4"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#111111"
        );

    } else {

        location.reload();

    }

}


/* ATTACH */

function showAttachMessage() {

    alert(
        "File upload can be connected here. " +
        "For production, add a secure backend for processing uploaded files."
    );

}


/* VOICE */

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported by this browser."
        );

        return;
    }


    const recognition =
        new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.start();


    recognition.onresult = function(event) {

        input.value =
            event.results[0][0].transcript;

        input.focus();

    };

}


/* AUTO RESIZE */

input.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height =
        Math.min(this.scrollHeight, 150) + "px";

});
