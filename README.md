# CleanCravings

## Pitch Deck
![CleanCravings - Pitch Deck-01](https://github.com/user-attachments/assets/c3f4cf8f-0948-437f-a3db-075e73b64fc6)
![CleanCravings - Pitch Deck-02](https://github.com/user-attachments/assets/2310d080-0c83-4e41-be8f-8b09c4a8a1fb)
![CleanCravings - Pitch Deck-03](https://github.com/user-attachments/assets/afe75c5c-111c-4a05-885c-d95d09fa13de)
![CleanCravings - Pitch Deck-04](https://github.com/user-attachments/assets/592b3b7c-34b5-4a0c-8a9e-4ecbdef1e873)
![CleanCravings - Pitch Deck-05](https://github.com/user-attachments/assets/8685a2c6-bdd9-4ee7-bd30-649cf5d95780)
![CleanCravings - Pitch Deck-06](https://github.com/user-attachments/assets/8719883c-8f4b-45ba-aa8a-0a38bca5480f)
![CleanCravings - Pitch Deck-07](https://github.com/user-attachments/assets/8061cebe-9676-4763-81ed-12831545c987)
![CleanCravings - Pitch Deck-08](https://github.com/user-attachments/assets/cfe29098-a20a-4bc9-8885-6c0d3715a853)
![CleanCravings - Pitch Deck-09](https://github.com/user-attachments/assets/89b41123-5a19-41f9-8de6-a2bc88164785)
![CleanCravings - Pitch Deck-10](https://github.com/user-attachments/assets/81905cc0-5ce0-46f9-a999-cff0c1be9f5f)
![CleanCravings - Pitch Deck-11](https://github.com/user-attachments/assets/47484b61-d8ff-414a-a8f2-551ec5273210)
![CleanCravings - Pitch Deck-12](https://github.com/user-attachments/assets/12aea630-3de7-46d9-a7c9-1df2efd38d90)
![CleanCravings - Pitch Deck-13](https://github.com/user-attachments/assets/e7f0b115-3865-421e-844c-38d3b3796a4d)


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
3. `source ./myenv/activate`
4. `pip install -r requirements.txt`
5. Get credentials and API keys
6. `python app.py`

### Testing Frontend

1. `cd ui`
2. `npm i`
3. `npm run build`
4. `npx expo start`
