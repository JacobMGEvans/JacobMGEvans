### Instructions for Building a Cyberpunk 2077-Inspired Map Overlay Feature

**Objective:** Create a full-page overlay that activates when the user clicks the "Explore" button. The overlay should have a Cyberpunk 2077-inspired HUD design, featuring neon colors, glitch effects, and futuristic scan animations.

**Requirements:**

1. **Overlay Activation:**

   - The overlay should be triggered by clicking the "Explore" button.
   - Ensure the overlay can be toggled on/off.

2. **Design:**

   - The overlay must feature a Cyberpunk 2077-inspired HUD design.
   - Use neon colors and glitch effects to enhance the visual appeal.
   - Implement futuristic scan animations that simulate a HUD scanning the site.

3. **Floating Windows:**

   - Include at least two interactive floating windows styled like futuristic UI panels from Cyberpunk 2077:
     - **Global Map Window:**
       - Display a global map showing real-time locations of other users currently visiting the site.
       - The map must be interactive (zoom, pan) and update live using Durable Objects for real-time presence synchronization.
       - Represent users as pinging dots on the map, similar to the game.
     - **Details Panel:**
       - The second floating window should display details about the user's location using the Durable Object.

4. **Responsiveness and Transitions:**

   - Ensure the overlay is responsive and visually immersive.
   - Implement smooth transitions for opening and closing the overlay.

5. **Technologies:**

   - Use the best map library for React that supports real-time updates and interactivity.
   - Utilize Tailwind CSS for styling and layout.
   - Incorporate anime.js for animations and transitions.

6. **Code Structure:**
   - Use modern web technologies (React & TypeScript + Tailwind + Cloudflare Worker + Durable Objects).
   - Include comments in the code to explain key parts, especially the integration with Durable Objects for real-time user tracking.

### Notes:

- Ensure to replace the map library with the best option for your needs.
- The code structure is a basic outline; further customization and styling will be necessary to achieve the desired Cyberpunk aesthetic.
- Make sure to handle real-time updates and user tracking effectively with Durable Objects.
