# CleanCravings

## Inspiration

CleanCravings is built on the foundation of the 3 Cs: Cut Food Waste, Clean Carbon, and Clean Health. Have you ever had to throw away ingredients before even using them because they expired? Food waste is a significant issue globally, and Canada alone generates over 50 million tonnes of food waste each year. Surprisingly, 60% of this waste is avoidable through better planning. On average, a Canadian household produces 79 kilograms of food waste annually, according to the UN Food Waste Index. Beyond food waste, our dietary choices have a profound impact on the environment. Diet-related carbon emissions are a major contributor to climate change. However, even small changes in our eating habits can reduce our carbon footprint by up to 25%. Moreover, a lot of people struggle with finding recipes that fit their specific needs. Whether it's allergies, health-related conditions like diabetes or celiac disease, or dietary preferences like vegan, vegetarian, or kosher. This inspired us to create a solution that empowers households to waste less, eat more sustainably, and make a positive impact on both the planet and personal health. We gamified aspects of the app to make the experience more engaging and enjoyable with features like progress tracking, rewards system, and leaderboard among friends.

## How we built our project

We used React-Native for frontend and Flask Python for backend. We implemented a camera feature using Expo Camera, allowing users to capture images of their fridge contents. These images are converted into base64 format and sent to our backend for processing. For ingredient detection, we used Google's Gemini API to analyze the images to identify items and provide metadata such as ingredient names, quantities, units, estimated expiry dates, and carbon footprint levels. Our backend processes user inputs and integrates them with personalized recipe generation. We designed a system to handle dietary preferences, restrictions, and allergies to take individual needs into consideration.

## Challenges we faced

We began with many feature ideas, including options to share recipes with friends, for doctors to recommend diets and provide feedback, and support for users with eating disorders. However, with limited time we had to narrow our focus to core features that directly addressed our goals of reducing food waste, lowering carbon footprints, and providing personalized recipes. Deciding what to prioritize and what to set aside was challenging but necessary to create CleanCravings.

## Setup

### Starting the Server

1. `cd server`
2. `python -m venv myenv` or appropiate method depending on your OS
3. ` source ./myenv/activate`
4. `pip install -r requirements.txt`
5. Get credentials and API keys
6. ` python app.py`

### Testing Frontend

1. ` cd ui`
2. `npm i`
3. `npm run build`
4. `npx expo start`
