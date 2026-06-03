# FRAM Webshop

FRAM Webshop is my final project for the Frontend Essentials course. The project is based on a Figma design for a sustainable food delivery service in Norway that connects customers with local farms.

The website is built with plain HTML, CSS, and JavaScript. It includes a landing page, a product page, and a chatbot page with OpenAI integration running directly in the browser.

## Project Goals

The goal of the project was to demonstrate:

- responsive frontend development with HTML5 and CSS3
- semantic page structure
- browser-based JavaScript interaction
- external API integration using the OpenAI API
- accessible and user-friendly interface design

## Pages

The project includes these pages:

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
- Newsletter/contact form validation with JavaScript

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
- any other simple static file server

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

## API Limitations, Ethical Considerations, and Potential Bias

The chatbot in this project is meant as a helpful prototype, not as a perfect or fully reliable support agent.

### Limitations

- The OpenAI integration runs entirely in the browser, which is acceptable for learning but not secure enough for a production application.
- The chatbot can still produce answers that are too general, incomplete, or simply wrong.
- The assistant is guided to stay on FRAM-related topics, but it may still misunderstand some questions or give uneven quality answers.

### Ethical Considerations

- Users should know that they are talking to an AI system, not a real support person.
- AI-generated answers should not be treated as guaranteed facts without checking them.
- The project avoids storing the user’s OpenAI key in the source code or GitHub repository.
- The chat should not be used to collect sensitive personal information.

### Potential Bias

- Like other AI systems, the model may reflect biases from its training data.
- Some replies may favor certain assumptions or ways of phrasing things over others.
- The quality of the answer may vary depending on how a user writes the question.
- Sustainability-related topics can also be simplified too much by the model, so responses should be read critically.

## Accessibility Notes

The project includes several accessibility-focused choices:

- semantic HTML structure
- form labels for inputs
- keyboard-friendly controls
- visible focus states
- `aria-live` region in the chat
- descriptive button labels

## Known Limitations

- The chatbot is a frontend-only prototype and uses a browser-entered API key.
- The chat is intentionally limited to FRAM-related topics.
- There is still a small visual seam at the bottom of the hero area that could be refined further.
- This project is designed as a course submission and not as a production-ready webshop.

## Future Improvements

- Improve the final visual polish in a few edge cases
- Add a more advanced form flow if the design is expanded later
- Improve chatbot response guidance further
- Complete final accessibility and Lighthouse testing
- Add a backend solution for secure API handling

## Development Notes

I built the project step by step and tried to keep the code understandable from a beginner frontend perspective:

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

## Image Credits

The design references and current implementation use images originally sourced from Unsplash.

- Hero image by Markus Spiske on Unsplash
- Seasonal produce image by Nina Luong on Unsplash
- Farmer image by Rebecca Ritchie on Unsplash
- Oats image by Lukasz Rawa on Unsplash
- Potatoes image by Rodrigo dos Reis on Unsplash
- Carrots image by Goh Rhy Yan on Unsplash
- Red onions image by Goh Rhy Yan on Unsplash
- Garlic image by Matthew Pilachowski on Unsplash

## Author

Created as part of the Frontend Essentials final assignment.
