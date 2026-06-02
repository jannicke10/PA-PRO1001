# FRAM Webshop

FRAM Webshop is a frontend project for the Frontend Essentials course. The project is based on a Figma design for a sustainable Norwegian food delivery service that connects customers with local farms.

The website is built with plain HTML, CSS, and JavaScript. It includes a landing page, a product page, and a chatbot page with OpenAI integration in the browser.

## Project Goals

This project was created to demonstrate:

- responsive frontend development with HTML5 and CSS3
- semantic page structure
- browser-based JavaScript interaction
- external API integration using the OpenAI API
- accessible and user-friendly interface design

## Pages

The project currently includes these pages:

- `index.html`  
  Landing page introducing the FRAM service and highlighting selected products.

- `product.html`  
  Product overview page showing seasonal produce and the farm map section.

- `chat.html`  
  Chat page where the user can ask FRAM-related questions using the OpenAI API.

## Features

- Responsive layout for desktop and mobile
- Figma-based visual design
- CSS-only navigation menu overlay
- Product cards and content sections
- Embedded map section
- OpenAI chatbot using `fetch()` and plain JavaScript
- Typing indicator in the chat
- Error handling for:
  - missing API key
  - empty message
  - invalid API key
  - quota/rate limit issues
  - temporary API/server errors
- Session-based chat state restore in the browser

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenAI Chat Completions API
- Google Fonts
- Embedded Google Maps view

## How to Run the Project Locally

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code or another editor.
3. Start a local server.

Examples:

- VS Code Live Server
- Python simple server
- any other small static file server

4. Open `index.html` in the browser through the local server.

## How to Use the Chatbot

1. Open `chat.html`.
2. Paste your OpenAI API key into the setup field.
3. Click `Use key`.
4. Type a FRAM-related question in the message field.
5. Send the message.

Important:

- The API key must not be stored in the repository.
- The API key is only used in the browser for this prototype.
- The key is kept in browser session storage during the current session so the chat can recover from accidental refreshes.

## OpenAI Setup

This project uses a plain browser-based `fetch()` request to the OpenAI API, based on the course module approach.

Because this project runs entirely in the browser:

- the API key is entered by the user at runtime
- the API key is not hardcoded in the source code
- the API key is not suitable for production use in this frontend-only setup

For a production-ready solution, OpenAI requests should be sent through a backend server where the key can be kept secret.

## Accessibility Notes

The project includes several accessibility-focused decisions:

- semantic HTML structure
- form labels for inputs
- keyboard-friendly controls
- visible focus states
- `aria-live` region in the chat
- descriptive button labels

## Known Limitations

- The chatbot is a frontend-only prototype and uses a browser-entered API key.
- The chat is intentionally limited to FRAM-related topics.
- Some page imagery currently uses remote image URLs instead of final exported local assets.
- The README reflects the current state of the project, and more submission polish may still be added.

## Future Improvements

- Add a dedicated contact page with client-side form validation
- Replace placeholder/remote images with final local design assets
- Improve chatbot response guidance further
- Complete final accessibility and Lighthouse testing
- Refine remaining visual bugs in the navigation/menu overlay

## Development Notes

The project was built step by step with focus on keeping the code understandable for a beginner-level frontend workflow:

- structure the layout first
- build the static chat UI
- add local chat interaction
- connect the OpenAI API
- improve error handling and user experience

## Resources Used

- Course material from Frontend Essentials
- Figma design specification provided for the assignment
- OpenAI API documentation and course module examples
- Browser developer tools for testing and debugging

## Author

Project created as part of the Frontend Essentials final assignment.
