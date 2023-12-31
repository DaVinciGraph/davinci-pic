const showMessage = (parentElement, message, duration) => {
	const messageElement = document.createElement("div");
	messageElement.className = "copy-message"; // Add your CSS class here
	messageElement.innerText = message;
	parentElement.appendChild(messageElement);

	setTimeout(() => {
		parentElement.removeChild(messageElement);
	}, duration);
};

customElements.define(
	"copy-snippet",
	class extends HTMLElement {
		set header(value) {
			this.setAttribute("header", value);
		}

		get header() {
			return this.getAttribute("header");
		}
		constructor() {
			super();
		}

		connectedCallback() {
			const davinciPic = this.querySelector("davinci-pic");

			let davinciPicString = "<davinci-pic";
			for (const { name, value } of davinciPic.attributes) {
				if (name !== "delay-response-time" && name !== "style") {
					davinciPicString += ` ${name}="${value}"`;
				}
			}
			davinciPicString += "></davinci-pic>";

			const copyButton = document.createElement("button");
			copyButton.className = "copy_button";
			copyButton.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16">
				<path
					d="M18.5 5C15.480226 5 13 7.4802259 13 10.5L13 32.5C13 35.519774 15.480226 38 18.5 38L34.5 38C37.519774 38 40 35.519774 40 32.5L40 10.5C40 7.4802259 37.519774 5 34.5 5L18.5 5 z M 18.5 8L34.5 8C35.898226 8 37 9.1017741 37 10.5L37 32.5C37 33.898226 35.898226 35 34.5 35L18.5 35C17.101774 35 16 33.898226 16 32.5L16 10.5C16 9.1017741 17.101774 8 18.5 8 z M 11 10L9.78125 10.8125C8.66825 11.5545 8 12.803625 8 14.140625L8 33.5C8 38.747 12.253 43 17.5 43L30.859375 43C32.197375 43 33.4465 42.33175 34.1875 41.21875L35 40L17.5 40C13.91 40 11 37.09 11 33.5L11 10 z"
					fill="#5B5B5B"
				/>
			</svg>`;

			copyButton.addEventListener("click", () => {
				try {
					navigator.clipboard.writeText(davinciPicString);
					showMessage(copyButton, "Copied!", 3000);
				} catch {}
			});

			const titleElement = document.createElement("div");
			titleElement.innerHTML = `<span>${this.header}</span>`;
			titleElement.appendChild(copyButton);

			titleElement;

			this.appendChild(titleElement);
		}
	}
);
